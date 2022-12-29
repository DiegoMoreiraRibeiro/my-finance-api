import { ApiProperty } from '@nestjs/swagger';

export class TipoAcaoView {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  Descricao: string;
}
