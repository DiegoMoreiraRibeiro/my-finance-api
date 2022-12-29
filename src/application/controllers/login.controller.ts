import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../domain/auth/local-auth.guard';
import { AuthService } from '../../domain/service/auth.service';
import { LoginView } from '../dto/login.view';

@ApiTags('Login')
@Controller('api/login')
export class LoginController {
  crypto = require('crypto');
  saltOrRounds = 10;

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  @ApiBody({ type: LoginView })
  async login(@Body() loginView: LoginView) {
    return this.authService.login(loginView);
  }
}
