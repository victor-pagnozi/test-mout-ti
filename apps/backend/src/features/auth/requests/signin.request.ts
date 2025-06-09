import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SigninRequest {
  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  password: string;
}
