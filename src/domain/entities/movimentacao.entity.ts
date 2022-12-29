import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TipoAcao } from './tipoacao.entity';
import { Usuario } from './usuario.entity';

export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity()
export class Movimentacao {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 500 })
  Descricao: string;

  @Column({ name: 'DataMovimentacao' })
  DataMovimentacao: Date;

  @Column({ name: 'MovimentacaoCompartilhada' })
  MovimentacaoCompartilhada: boolean;

  @Column('decimal', {
    precision: 14,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  Valor: number;

  @Column({ name: 'TipoAcaoId' })
  TipoAcaoId: number;
  @OneToOne(() => TipoAcao)
  @JoinColumn({
    name: 'TipoAcaoId',
  })
  TipoAcao: TipoAcao;

  @Column({ name: 'UsuarioId' })
  UsuarioId: number;
  @OneToOne(() => Usuario)
  @JoinColumn({
    name: 'UsuarioId',
  })
  Usuario: Usuario;
}
