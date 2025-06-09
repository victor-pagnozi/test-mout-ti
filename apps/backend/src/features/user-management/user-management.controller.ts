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
    summary: 'Criar um novo usuário',
    description: 'Cria um novo usuário com as informações fornecidas',
  })
  @ApiBody({
    type: CreateUserRequest,
    description: 'Dados para criação do usuário',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: FindUserResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos ou erros de validação',
  })
  @ApiResponse({
    status: 409,
    description: 'Email já existe',
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
    summary: 'Obter todos os usuários',
    description: 'Recupera uma lista de todos os usuários ativos',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuários recuperados com sucesso',
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
    summary: 'Obter usuário por ID',
    description: 'Recupera um usuário específico pelo seu identificador único',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único do usuário (UUID)',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário recuperado com sucesso',
    type: FindUserResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
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
    summary: 'Atualizar usuário por ID',
    description: 'Atualiza as informações do usuário com os dados fornecidos',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único do usuário (UUID)',
  })
  @ApiBody({
    type: CreateUserRequest,
    description:
      'Dados de atualização do usuário (todos os campos são opcionais)',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: FindUserResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'Email já existe (ao atualizar email)',
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
    summary: 'Excluir usuário por ID (exclusão lógica)',
    description:
      'Realiza uma exclusão lógica no usuário (define o timestamp deleted_at)',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único do usuário (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: 'string',
  })
  @ApiResponse({
    status: 204,
    description: 'Usuário excluído com sucesso (exclusão lógica)',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
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
