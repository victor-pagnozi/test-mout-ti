import { Injectable, ConflictException } from '@nestjs/common';
import { BaseUserService } from './base-user.service';
import { CreateUserRequest } from '../requests/create-user.request';
import { User } from '@app/common/models/user/user.model';

@Injectable()
export class UserCreatorService extends BaseUserService {
  async execute(createUserRequest: CreateUserRequest): Promise<User> {
    await this.validateEmailUniqueness(createUserRequest.email);

    const user = this.userRepository.create(createUserRequest);

    return this.saveUser(user);
  }

  private async validateEmailUniqueness(email: string): Promise<void> {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
  }
}
