import { ApiProperty } from '@nestjs/swagger';

export class FindUserResponse {
  @ApiProperty({
    description: 'User unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({ description: 'User first name', example: 'John' })
  first_name: string;

  @ApiProperty({ description: 'User last name', example: 'Doe' })
  last_name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({ description: 'Country code', example: '+55' })
  country_code: string;

  @ApiProperty({
    description: 'Phone number',
    example: '11999999999',
    nullable: true,
  })
  phone_number: string | null;

  @ApiProperty({
    description: 'Date of birth',
    example: '1990-01-01',
    nullable: true,
  })
  date_of_birth: Date | null;

  @ApiProperty({ description: 'User active status', example: true })
  is_active: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Deletion timestamp',
    example: null,
    nullable: true,
  })
  deleted_at: Date | null;
}
