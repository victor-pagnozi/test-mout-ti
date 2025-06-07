import { Injectable } from '@nestjs/common';
import { BaseUserService } from './base-user.service';
import { Repository } from 'typeorm';
import { User } from '@app/common/models/user';

@Injectable()
export class UserEraserService extends BaseUserService {
  constructor(userRepository: Repository<User>) {
    super(userRepository);
  }

  async execute(id: string): Promise<boolean> {
    const result = await this.userRepository.softDelete(id);

    return !!result.affected;
  }
}
