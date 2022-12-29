import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './usuario.service';

@Injectable()
export class AuthService {
  crypto = require('crypto');
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    pass = this.crypto.createHash('md5').update(pass).digest('hex');
    const user = await this.usuarioService.checkAuth(username, pass);
    if (user) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    user.senha = this.crypto.createHash('md5').update(user.senha).digest('hex');
    const usuario = await this.usuarioService.checkAuth(user.email, user.senha);
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      id: usuario.Id,
      nome: usuario.Nome,
      email: usuario.Email,
    };
  }
}
