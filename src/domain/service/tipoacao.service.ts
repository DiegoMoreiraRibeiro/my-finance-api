import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TipoAcao } from '../entities/tipoacao.entity';

@Injectable()
export class TipoAcaoService {
  constructor(
    @Inject('TIPOACAO_REPOSITORY')
    private tipoAcaoRepository: Repository<TipoAcao>,
  ) {}

  async findAll(): Promise<TipoAcao[]> {
    return this.tipoAcaoRepository.find();
  }

  async findId(id: number): Promise<TipoAcao> {
    return this.tipoAcaoRepository.findOne({
      where: [{ Id: id }],
      order: { Id: 'DESC' },
    });
  }

  async findCodigo(Codigo: number): Promise<TipoAcao> {
    return this.tipoAcaoRepository.findOne({
      where: [{ Codigo: Codigo }],
      order: { Id: 'DESC' },
    });
  }

  async add(tipoAcao: TipoAcao): Promise<TipoAcao> {
    return this.tipoAcaoRepository.save(tipoAcao);
  }

  async update(tipoAcao: TipoAcao): Promise<TipoAcao> {
    await this.tipoAcaoRepository.update(tipoAcao.Id, tipoAcao);
    return tipoAcao;
  }

  async deleteId(id: number): Promise<number> {
    const tipoAcao = await this.tipoAcaoRepository.findOne({
      where: [{ Id: id }],
      order: { Id: 'DESC' },
    });
    await this.tipoAcaoRepository.delete(tipoAcao.Id);
    return id;
  }
}
