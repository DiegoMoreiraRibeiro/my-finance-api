import { Module } from '@nestjs/common';
import { AuthModule } from './infra/module/auth.module';
import { MovimentacaoController } from './application/controllers/movimentacao.controller';
import { TipoAcaoController } from './application/controllers/tipoacao.controller';
import { UsuarioController } from './application/controllers/usuario.controller';
import { MovimentacaoModule } from './infra/module/movimentacao.module';
import { TipoAcaoModule } from './infra/module/tipoacao.module';
import { LoginController } from './application/controllers/login.controller';
import { UsuarioModule } from './infra/module/usuario.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV.trim()}.env`.trim(),
    }),
    UsuarioModule,
    TipoAcaoModule,
    MovimentacaoModule,
    AuthModule,
  ],
  controllers: [
    UsuarioController,
    TipoAcaoController,
    MovimentacaoController,
    LoginController,
  ],
})
export class AppModule {}
