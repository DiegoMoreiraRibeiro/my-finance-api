import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    try {
      return this.usuarioRepository.find();
    } catch (error) {}
  }

  async checkAuth(email: string, senha: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      where: [{ Email: email, Senha: senha }],
    });
  }

  async findId(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      where: [{ Id: id }],
      order: { Id: 'DESC' },
    });
  }

  async add(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.usuarioRepository.update(usuario.Id, usuario);
    return usuario;
  }

  async deleteId(id: number): Promise<number> {
    const usuario = await this.usuarioRepository.findOne({
      where: [{ Id: id }],
      order: { Id: 'DESC' },
    });
    await this.usuarioRepository.delete(usuario.Id);
    return id;
  }
}
