import { UsuarioController } from '../application/controllers/usuario.controller';
import { Usuario } from '../domain/entities/usuario.entity';
import { UsuarioService } from '../domain/service/usuario.service';
import { Repository } from 'typeorm';
import { exec } from 'child_process';
import { response } from 'express';

describe('UsuarioController', () => {
  let usuarioController: UsuarioController;
  let usuarioService: UsuarioService;
  let usuarioRepository: Repository<Usuario>;

  beforeEach(() => {
    usuarioService = new UsuarioService(usuarioRepository);
    usuarioController = new UsuarioController(usuarioService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {});
  });
});
