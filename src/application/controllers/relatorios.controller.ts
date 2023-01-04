import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovimentacaoService } from '../../domain/service/movimentacao.service';

@ApiTags('Relatorio')
@Controller('api/relatorio')
export class RelatorioController {
  constructor(private readonly movimentacaoService: MovimentacaoService) {}

  @Get('usuario-ano/:id/:ano')
  //@UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
  async GetByUsuarioData(
    @Param('id') Id: number,
    @Param('ano') Ano: number,
  ): Promise<any> {
    return await this.movimentacaoService.relatorioEntradaSaidaAnual(Id, Ano);
  }
}
