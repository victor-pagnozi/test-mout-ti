import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseUserService } from './base-user.service';
import { User } from '@app/common/models/user/user.model';

@Injectable()
export class UserFinderService extends BaseUserService {
  async findById(id: string): Promise<User> {
    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }
}
