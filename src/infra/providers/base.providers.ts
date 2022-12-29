import { TipoAcao } from '../../domain/entities/tipoacao.entity';
import { Usuario } from '../../domain/entities/usuario.entity';
import { DataSource } from 'typeorm';
import { Movimentacao } from '../../domain/entities/movimentacao.entity';

export const usuarioProviders = [
  {
    provide: 'USUARIO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Usuario),
    inject: ['DATA_SOURCE'],
  },
];

export const tipoAcaoProviders = [
  {
    provide: 'TIPOACAO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TipoAcao),
    inject: ['DATA_SOURCE'],
  },
];

export const movimentacaoProviders = [
  {
    provide: 'MOVIMENTACAO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Movimentacao),
    inject: ['DATA_SOURCE'],
  },
];
