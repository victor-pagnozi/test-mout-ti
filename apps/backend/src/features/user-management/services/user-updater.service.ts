import { Injectable, ConflictException } from '@nestjs/common';
import { BaseUserService } from './base-user.service';
import { User } from '@app/common/models/user/user.model';
import { Repository } from 'typeorm';
import { CreateUserRequest } from '../requests/create-user.request';
import { FindUserResponse } from '../responses/find-user.response';

@Injectable()
export class UserUpdaterService extends BaseUserService {
  constructor(userRepository: Repository<User>) {
    super(userRepository);
  }

  async execute(
    id: string,
    updateUserRequest: CreateUserRequest,
  ): Promise<FindUserResponse> {
    const user = await this.userRepository.findOneByOrFail({
      id,
    });

    console.log(user);

    if (updateUserRequest.email && updateUserRequest.email !== user.email) {
      await this.validateEmailUniqueness(updateUserRequest.email, id);
    }

    this.updateUserProperties(user, updateUserRequest);

    const result = await this.saveUser(user);

    return new FindUserResponse(result);
  }

  private async validateEmailUniqueness(
    email: string,
    currentUserId: string,
  ): Promise<void> {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser && existingUser.id !== currentUserId) {
      throw new ConflictException('Email already exists');
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
