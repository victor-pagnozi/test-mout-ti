import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseUserService } from './base-user.service';
import { FindUserResponse } from '../responses/find-user.response';
import { ReadUserResponse } from '../responses/read-user.response';

@Injectable()
export class UserFinderService extends BaseUserService {
  async findById(id: string): Promise<FindUserResponse> {
    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return new FindUserResponse(user);
  }

  async findAll(): Promise<ReadUserResponse> {
    const [results, totalResults] = await this.userRepository.findAndCount();

    return new ReadUserResponse(results, totalResults);
  }

  async findByEmail(email: string): Promise<FindUserResponse> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return new FindUserResponse(user);
  }
}
