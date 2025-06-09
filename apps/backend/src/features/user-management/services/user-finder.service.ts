import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseUserService } from './base-user.service';
import { FindUserResponse } from '../responses/find-user.response';
import { ReadUserResponse } from '../responses/read-user.response';
import { CacheService } from '@app/common/services/cache/cache.service';
import { User } from '@app/common/models/user';
import { CacheKey } from '@app/common/common/enums/cache';

@Injectable()
export class UserFinderService extends BaseUserService {
  private readonly CACHE_TTL = 50000;

  constructor(
    userRepository: Repository<User>,
    private readonly cacheService: CacheService,
  ) {
    super(userRepository);
  }

  async findById(id: string): Promise<FindUserResponse> {
    const cacheKey = `${CacheKey.USER}${id}`;

    const cachedUser = await this.cacheService.get<FindUserResponse>(cacheKey);

    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const response = new FindUserResponse(user);

    await this.cacheService.set(cacheKey, response, this.CACHE_TTL);

    return response;
  }

  async findAll(): Promise<ReadUserResponse> {
    const cachedUsers = await this.cacheService.get<ReadUserResponse>(
      CacheKey.USERS_ALL,
    );

    if (cachedUsers) {
      return cachedUsers;
    }

    const [results, totalResults] = await this.userRepository.findAndCount();

    const response = new ReadUserResponse(results, totalResults);

    await this.cacheService.set(CacheKey.USERS_ALL, response, this.CACHE_TTL);

    return response;
  }

  async findByEmail(email: string): Promise<FindUserResponse> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return new FindUserResponse(user);
  }
}
