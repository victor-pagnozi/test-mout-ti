import { User } from '@app/common/models/user';
import { HasherService } from '@app/common/services/hasher/hasher.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SigninRequest } from '../requests/signin.request';

@Injectable()
export class SigninService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hasherService: HasherService,
  ) {}

  async signin(input: SigninRequest) {
    const user = await this.userRepository.findOneByOrFail({
      email: input.email,
    });

    const isPasswordValid = await this.hasherService.verify(
      user.password,
      input.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    return true;
  }
}
