import { Injectable, ConflictException } from '@nestjs/common';
import { BaseUserService } from './base-user.service';
import { User } from '@app/common/models/user/user.model';
import { Repository } from 'typeorm';
import { CreateUserRequest } from '../requests/create-user.request';
import { FindUserResponse } from '../responses/find-user.response';
import { CacheService } from '@app/common/services/cache/cache.service';
import { CacheKey } from '@app/common/common/enums/cache';

@Injectable()
export class UserUpdaterService extends BaseUserService {
  constructor(
    userRepository: Repository<User>,
    private readonly cacheService: CacheService,
  ) {
    super(userRepository);
  }

  async execute(
    id: string,
    updateUserRequest: CreateUserRequest,
  ): Promise<FindUserResponse> {
    const user = await this.userRepository.findOneByOrFail({
      id,
    });

    if (updateUserRequest.email && updateUserRequest.email !== user.email) {
      await this.validateEmailUniqueness(updateUserRequest.email, id);
    }

    this.updateUserProperties(user, updateUserRequest);

    const result = await this.saveUser(user);

    await Promise.all([
      this.cacheService.delete(CacheKey.USER + id),
      this.cacheService.delete(CacheKey.USERS_ALL),
    ]);

    return new FindUserResponse(result);
  }

  private async validateEmailUniqueness(
    email: string,
    currentUserId: string,
  ): Promise<void> {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser && existingUser.id !== currentUserId) {
      throw new ConflictException('Email já cadastrado anteriormente.');
    }
  }

  private updateUserProperties(
    user: User,
    updateData: CreateUserRequest,
  ): void {
    Object.keys(updateData).forEach((key) => {
      if (updateData[key as keyof CreateUserRequest] !== undefined) {
        (user as Record<string, any>)[key] =
          updateData[key as keyof CreateUserRequest];
      }
    });
  }
}
