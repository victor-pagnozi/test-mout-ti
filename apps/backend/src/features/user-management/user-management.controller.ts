import { RouteTags } from '@app/common/common/enums/route-tags';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import {
  UserCreatorService,
  UserEraserService,
  UserFinderService,
  UserUpdaterService,
} from './services';
import { CreateUserRequest } from './requests/create-user.request';
import { FindUserResponse } from './responses/find-user.response';
import { sendResponse } from '@app/common/functions/sendResponse';
import { ResponseBody } from '@app/common/interfaces/ResponseService';
import { ReadUserResponse } from './responses/read-user.response';

@Controller(RouteTags.USERS)
@ApiTags(RouteTags.USERS)
export class UserManagementController {
  constructor(
    private readonly userCreatorService: UserCreatorService,
    private readonly userFinderService: UserFinderService,
    private readonly userUpdaterService: UserUpdaterService,
    private readonly userEraserService: UserEraserService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user with the provided information',
  })
  @ApiBody({
    type: CreateUserRequest,
    description: 'User creation data',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: FindUserResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data or validation errors',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists',
  })
  async create(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<ResponseBody<FindUserResponse>> {
    const result = await this.userCreatorService.execute(createUserRequest);

    return sendResponse({
      data: result,
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all active users',
  })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    type: [FindUserResponse],
  })
  async findAll(): Promise<ResponseBody<ReadUserResponse>> {
    const result = await this.userFinderService.findAll();

    return sendResponse({
      data: result,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieves a specific user by their unique identifier',
  })
  @ApiParam({
    name: 'id',
    description: 'User unique identifier (UUID)',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: FindUserResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseBody<FindUserResponse>> {
    const result = await this.userFinderService.findById(id);

    return sendResponse({
      data: result,
    });
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user by ID',
    description: 'Updates user information with the provided data',
  })
  @ApiParam({
    name: 'id',
    description: 'User unique identifier (UUID)',
  })
  @ApiBody({
    type: CreateUserRequest,
    description: 'User update data (all fields are optional)',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: FindUserResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists (when updating email)',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserRequest: CreateUserRequest,
  ): Promise<ResponseBody<FindUserResponse>> {
    const result = await this.userUpdaterService.execute(id, updateUserRequest);

    return sendResponse({
      data: result,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Soft delete user by ID',
    description:
      'Performs a soft delete on the user (sets deleted_at timestamp)',
  })
  @ApiParam({
    name: 'id',
    description: 'User unique identifier (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: 'string',
  })
  @ApiResponse({
    status: 204,
    description: 'User deleted successfully (soft delete)',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async remove(@Param('id') id: string): Promise<ResponseBody<void>> {
    const result = await this.userEraserService.execute(id);

    if (!result) {
      throw new NotFoundException(id);
    }

    return sendResponse({
      status: result,
    });
  }
}
