import { Injectable } from '@nestjs/common';
import { BaseUserService } from './base-user.service';
import { UserFinderService } from './user-finder.service';
import { Repository } from 'typeorm';
import { User } from '@app/common/models/user';

@Injectable()
export class UserEraserService extends BaseUserService {
  constructor(
    userRepository: Repository<User>,
    private readonly userFinderService: UserFinderService,
  ) {
    super(userRepository);
  }

  async execute(id: string): Promise<void> {
    await this.userFinderService.findById(id);

    await this.userRepository.softDelete(id);
  }
}
