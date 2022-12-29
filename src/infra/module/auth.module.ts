import { Module } from '@nestjs/common';
import { AuthService } from '../../domain/service/auth.service';
import { LocalStrategy } from '../../domain/auth/local.strategy';
import { JwtStrategy } from '../../domain/auth/jwt.strategy';
import { UsersModule } from './users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../domain/auth/constants';
import { UsuarioModule } from './usuario.module';

@Module({
  imports: [
    UsersModule,
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
