import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserRequest {
  @ApiProperty({ description: 'User first name', example: 'John' })
  @IsString()
  first_name: string;

  @ApiProperty({ description: 'User last name', example: 'Doe' })
  @IsString()
  last_name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Country code (4 characters)', example: '+55' })
  @IsString()
  @IsOptional()
  @Length(4, 4)
  country_code?: string;

  @ApiProperty({
    description: 'Phone number (up to 12 characters)',
    example: '11999999999',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 12)
  phone_number?: string;

  @ApiProperty({
    description: 'Date of birth',
    example: '1990-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  date_of_birth?: Date;

  @ApiProperty({
    description: 'User active status',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean = true;
}
