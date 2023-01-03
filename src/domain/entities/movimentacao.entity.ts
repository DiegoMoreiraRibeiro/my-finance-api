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

  @Column({
    name: 'MovimentacaoCompartilhada',
    type: 'bit',
    transformer: { from: (v: Buffer) => !!v.readInt8(0), to: (v) => v },
  })
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

  @Column({ name: 'UsuarioMovimentacaoCompartilhadaId' })
  UsuarioMovimentacaoCompartilhadaId?: number;
  @OneToOne(() => Usuario)
  @JoinColumn({
    name: 'UsuarioId',
  })
  UsuarioMovimentacaoCompartilhada?: Usuario;
}
