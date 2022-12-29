import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 500 })
  Nome: string;

  @Column({ length: 500 })
  Email: string;

  @Column({ length: 500 })
  Senha: string;
}
