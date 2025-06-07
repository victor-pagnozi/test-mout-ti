import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseUserService } from './base-user.service';
import { CreateUserRequest } from '../requests/create-user.request';
import { User } from '@app/common/models/user/user.model';
import { HasherService } from '@app/common/services/hasher/hasher.service';
import { FindUserResponse } from '../responses/find-user.response';
@Injectable()
export class UserCreatorService extends BaseUserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    private readonly hasherService: HasherService,
  ) {
    super(userRepository);
  }

  async execute(
    createUserRequest: CreateUserRequest,
  ): Promise<FindUserResponse> {
    await this.validateEmailUniqueness(createUserRequest.email);

    createUserRequest.password = await this.hasherService.hash(
      createUserRequest.password,
    );

    const user = this.userRepository.create(createUserRequest);

    const response = await this.saveUser(user);

    return new FindUserResponse(response);
  }

  private async validateEmailUniqueness(email: string): Promise<void> {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
  }
}
