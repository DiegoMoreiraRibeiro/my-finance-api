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
import { TipoAcao } from '../../domain/entities/tipoacao.entity';
import { JwtAuthGuard } from '../../domain/auth/jwt-auth.guard';
import { TipoAcaoService } from '../../domain/service/tipoacao.service';
import { TipoAcaoView } from '../dto/tipo.acao.view';

@ApiTags('TipoAcao')
@Controller('api/tipoacao')
export class TipoAcaoController {
  constructor(private readonly tipoAcaoService: TipoAcaoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async Get(): Promise<TipoAcao[]> {
    return await this.tipoAcaoService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async GetById(@Param('Id') Id: number): Promise<TipoAcao> {
    return await this.tipoAcaoService.findId(Id);
  }

  @Get('codigo/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async GetByCodigo(@Param('Codigo') Codigo: number): Promise<TipoAcao> {
    return await this.tipoAcaoService.findCodigo(Codigo);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: TipoAcaoView })
  async Add(@Body() tipoAcao: TipoAcao): Promise<TipoAcao> {
    return await this.tipoAcaoService.add(tipoAcao);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: TipoAcaoView })
  async Update(@Body() tipoAcao: TipoAcao): Promise<TipoAcao> {
    return await this.tipoAcaoService.update(tipoAcao);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async DeleteById(@Param('Id') Id: number): Promise<number> {
    return await this.tipoAcaoService.deleteId(Id);
  }
}
