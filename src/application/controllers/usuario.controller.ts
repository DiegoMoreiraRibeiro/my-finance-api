import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Usuario } from '../../domain/entities/usuario.entity';
import { JwtAuthGuard } from '../../domain/auth/jwt-auth.guard';
import { UsuarioService } from '../../domain/service/usuario.service';

@ApiTags('Usuario')
@Controller('api/usuario')
export class UsuarioController {
  crypto = require('crypto');

  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  //@UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
  @HttpCode(200)
  async Get(): Promise<Usuario[]> {
    const usarios = await this.usuarioService.findAll();
    console.log(usarios);
    return await this.usuarioService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async GetById(@Param('Id') Id: number): Promise<Usuario> {
    return await this.usuarioService.findId(Id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async Add(@Body() usuario: Usuario): Promise<Usuario> {
    usuario.Senha = this.crypto
      .createHash('md5')
      .update(usuario.Senha)
      .digest('hex');
    return await this.usuarioService.add(usuario);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async Update(@Body() usuario: Usuario): Promise<Usuario> {
    usuario.Senha = this.crypto
      .createHash('md5')
      .update(usuario.Senha)
      .digest('hex');
    return await this.usuarioService.update(usuario);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async DeleteById(@Param('Id') Id: number): Promise<number> {
    return await this.usuarioService.deleteId(Id);
  }
}
