import { User } from '@app/common/models/user';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserResponse {
  @ApiProperty({
    description: 'User unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  readonly id: string;

  @ApiProperty({ description: 'User first name', example: 'John' })
  readonly first_name: string;

  @ApiProperty({ description: 'User last name', example: 'Doe' })
  readonly last_name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  readonly email: string;

  @ApiProperty({ description: 'Country code', example: '+55', nullable: true })
  readonly country_code: string | null;

  @ApiProperty({
    description: 'Phone number',
    example: '11999999999',
    nullable: true,
  })
  readonly phone_number: string | null;

  @ApiProperty({
    description: 'Date of birth',
    example: '1990-01-01',
    nullable: true,
  })
  readonly date_of_birth: Date | null;

  @ApiProperty({ description: 'User active status', example: true })
  is_active: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  readonly created_at: Date;

  constructor(user: User) {
    this.id = user.id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.country_code = user.country_code;
    this.phone_number = user.phone_number;
    this.date_of_birth = user.date_of_birth;
    this.is_active = user.is_active;
    this.created_at = user.created_at;
  }
}
