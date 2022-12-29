import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { movimentacaoProviders } from '../providers/base.providers';
import { MovimentacaoService } from '../../domain/service/movimentacao.service';

@Module({
  imports: [DatabaseModule],
  providers: [...movimentacaoProviders, MovimentacaoService],
  exports: [MovimentacaoService],
})
export class MovimentacaoModule {}
