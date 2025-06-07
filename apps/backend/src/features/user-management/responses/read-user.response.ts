import { ApiProperty } from '@nestjs/swagger';
import { FindUserResponse } from './find-user.response';
import { User } from '@app/common/models/user';

export class ReadUserResponse {
  @ApiProperty({ type: FindUserResponse })
  readonly records: FindUserResponse[];

  @ApiProperty({ type: Number })
  readonly total_records: number;

  constructor(users: User[], totalRecords: number) {
    this.records = users.map((user) => new FindUserResponse(user));
    this.total_records = totalRecords;
  }
}
