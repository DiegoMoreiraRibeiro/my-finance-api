import { ApiProperty } from '@nestjs/swagger';

export class MovimentacaoView {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  Descricao: string;

  @ApiProperty()
  DataMovimentacao: Date;

  @ApiProperty()
  MovimentacaoCompartilhada: boolean;

  @ApiProperty()
  Valor: number;

  @ApiProperty()
  UsuarioId: number;

  @ApiProperty()
  TipoAcaoId: number;

  @ApiProperty()
  UsuarioMovimentacaoCompartilhadaId: number;
}
