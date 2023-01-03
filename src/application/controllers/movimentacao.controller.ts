import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../domain/auth/jwt-auth.guard';
import { Movimentacao } from '../../domain/entities/movimentacao.entity';
import { MovimentacaoService } from '../../domain/service/movimentacao.service';
import { MovimentacaoView } from '../dto/movimentacao.view';

@ApiTags('Movimentacao')
@Controller('api/movimentacao')
export class MovimentacaoController {
  constructor(private readonly movimentacaoService: MovimentacaoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async Get(): Promise<Movimentacao[]> {
    return await this.movimentacaoService.findAll();
  }

  @Get('usuario-data/:id/:data')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async GetByUsuarioData(
    @Param('id') Id: number,
    @Param('data') Data: Date,
  ): Promise<any> {
    return await this.movimentacaoService.findUsuarioData(Id, Data);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async GetById(@Param('Id') Id: number): Promise<Movimentacao> {
    return await this.movimentacaoService.findId(Id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: MovimentacaoView })
  async Add(@Body() movimentacao: Movimentacao): Promise<Movimentacao> {
    try {
      return await this.movimentacaoService.add(movimentacao);
    } catch (error) {
      throw error;
    }
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: MovimentacaoView })
  async Update(@Body() movimentacao: Movimentacao): Promise<Movimentacao> {
    return await this.movimentacaoService.update(movimentacao);
  }

  @Delete(':Id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async DeleteById(@Param('Id') Id: number): Promise<number> {
    return await this.movimentacaoService.deleteId(Id);
  }
}
