import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tipoAcaoProviders } from '../providers/base.providers';
import { TipoAcaoService } from '../../domain/service/tipoacao.service';

@Module({
  imports: [DatabaseModule],
  providers: [...tipoAcaoProviders, TipoAcaoService],
  exports: [TipoAcaoService],
})
export class TipoAcaoModule {}
