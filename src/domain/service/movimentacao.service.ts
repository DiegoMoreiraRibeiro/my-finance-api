import { Injectable, Inject } from '@nestjs/common';
import { Raw, Repository } from 'typeorm';
import { Movimentacao } from '../entities/movimentacao.entity';
import { FormatDateEnd, FormatDateInit } from '../components/format';

@Injectable()
export class MovimentacaoService {
  CONFIG_RELATIONS = {
    TipoAcao: true,
    Usuario: true,
  };

  constructor(
    @Inject('MOVIMENTACAO_REPOSITORY')
    private movimentacaoRepository: Repository<Movimentacao>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.movimentacaoRepository.find({
      relations: this.CONFIG_RELATIONS,
    });
  }

  async findUsuarioData(id: number, data: Date): Promise<any> {
    try {
      data = new Date(data);
      const month = data.getMonth() + 1;
      const year = data.getFullYear();

      const firtDay = new Date(data.getFullYear(), Number(month), 1).getDate();

      const lastDay = new Date(
        data.getFullYear(),
        Number(month) + 1,
        0,
      ).getDate();

      const initDate = FormatDateInit(
        new Date(`${year}-${month}-${firtDay} 00:00:00`),
      );
      const endDate = FormatDateEnd(
        new Date(`${year}-${month}-${lastDay} 23:59:59`),
      );

      const list = await this.movimentacaoRepository.find({
        where: [
          {
            UsuarioId: id,
            DataMovimentacao: Raw(
              (x) => `${x} >= '${initDate}' and ${x} <= '${endDate}'`,
            ),
          },
        ],
        relations: this.CONFIG_RELATIONS,
      });

      const valEntrada = await this.movimentacaoRepository
        .createQueryBuilder('m')
        .select(`IFNULL(SUM(m.VALOR), 0)`, 'VALOR_ENTRADA')
        .where(
          `m.usuarioid = ${id} AND m.tipoacaoid = 1 AND m.DataMovimentacao  between '${initDate}' and '${endDate}'`,
        )
        .getRawOne();

      const valSaid = await this.movimentacaoRepository
        .createQueryBuilder('m')
        .select(`IFNULL(SUM(m.VALOR), 0)`, 'VALOR_SAIDA')
        .where(
          `m.usuarioid = ${id} AND m.tipoacaoid = 2 AND m.DataMovimentacao between '${initDate}' and '${endDate}'`,
        )
        .getRawOne();

      return {
        Movimentacao: list,
        Entrada: valEntrada['VALOR_ENTRADA'],
        Saida: valSaid['VALOR_SAIDA'],
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findId(id: number): Promise<Movimentacao> {
    return this.movimentacaoRepository.findOne({
      where: [{ Id: id }],
      order: { Id: 'DESC' },
      relations: this.CONFIG_RELATIONS,
    });
  }

  async add(movimentacao: Movimentacao): Promise<Movimentacao> {
    try {
      return this.movimentacaoRepository.save(movimentacao);
    } catch (error) {
      console.log(error);
    }
  }

  async update(movimentacao: Movimentacao): Promise<Movimentacao> {
    await this.movimentacaoRepository.update(movimentacao.Id, movimentacao);
    return movimentacao;
  }

  async deleteId(id: number): Promise<number> {
    const movimentacao = await this.movimentacaoRepository.findOne({
      where: [{ Id: id }],
    });
    await this.movimentacaoRepository.delete(movimentacao.Id);
    return id;
  }
}
