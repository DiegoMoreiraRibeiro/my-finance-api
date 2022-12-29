import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsuarioService } from '../../domain/service/usuario.service';
import { usuarioProviders } from '../providers/base.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...usuarioProviders, UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
