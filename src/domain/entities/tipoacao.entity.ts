import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoAcao {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 200 })
  Descricao: string;

  @Column()
  Codigo: number;
}
