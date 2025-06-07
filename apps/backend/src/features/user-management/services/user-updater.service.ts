import { Injectable, ConflictException } from '@nestjs/common';
import { BaseUserService } from './base-user.service';
import { UserFinderService } from './user-finder.service';
import { User } from '@app/common/models/user/user.model';
import { Repository } from 'typeorm';
import { CreateUserRequest } from '../requests/create-user.request';

@Injectable()
export class UserUpdaterService extends BaseUserService {
  constructor(
    userRepository: Repository<User>,
    private readonly userFinderService: UserFinderService,
  ) {
    super(userRepository);
  }

  async execute(
    id: string,
    updateUserRequest: CreateUserRequest,
  ): Promise<User> {
    const user = await this.userFinderService.findById(id);

    if (updateUserRequest.email && updateUserRequest.email !== user.email) {
      await this.validateEmailUniqueness(updateUserRequest.email, id);
    }

    this.updateUserProperties(user, updateUserRequest);
    return await this.saveUser(user);
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
      if (updateData[key] !== undefined) {
        user[key] = updateData[key];
      }
    });
  }
}
