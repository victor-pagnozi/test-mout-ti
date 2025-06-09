import { RouteTags } from '@app/common/common/enums/route-tags';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SigninService } from './services/signin.service';
import { SigninRequest } from './requests/signin.request';
import { sendResponse } from '@app/common/functions/sendResponse';

@Controller(RouteTags.AUTH)
@ApiTags(RouteTags.AUTH)
export class AuthController {
  constructor(private readonly signinService: SigninService) {}

  @Post('signin')
  @ApiBody({
    type: SigninRequest,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
  })
  async signin(@Body() input: SigninRequest) {
    const response = await this.signinService.signin(input);

    return sendResponse({
      status: response,
      message: 'Usuário autenticado com sucesso',
    });
  }
}
