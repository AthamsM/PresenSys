import UsuarioRepository from '../repositories/usuarioRepository.js';
import bcrypt from 'bcrypt';
import JwtService from '../services/jwtService.js'

class UsuarioService {

  async register(data) {
    if (!data.nome || !data.email || !data.senha) {
      const error = new Error(
        'Todos os campos (nome, email e senha) são obrigatórios.'
      );
      error.statusCode = 400;
      throw error;
    }
    if (!data.role) {
      data.role = 'MONITORA';
    }

    data.senha = await bcrypt.hash(data.senha, 10);

    return UsuarioRepository.create(data);
  }

   async login(data) {
    
    if (!data.email || !data.senha) {
      const error = new Error(
        'Os campos (email e senha) são obrigatórios.'
      );
      error.statusCode = 400;
      throw error;
    }

    const usuario = await UsuarioRepository.findByEmail(data.email);

    if(!usuario){
      const error = new Error('E-mail inválido');
      error.statusCode = 404;
      throw error;
    }

    const validarSenha = await bcrypt.compare(data.senha, usuario.senha)

    if(!validarSenha){
      const error = new Error('Senha inválida');
      error.statusCode = 404;
      throw error;
    }

    return JwtService.gerarToken(usuario);

  }

  async findAll(){
    return UsuarioRepository.findAll();
  }

  async findById(id) {
    const usuario = await UsuarioRepository.findById(Number(id));
    if(!usuario){
      const error = new Error('Usuario não encontrado');
      error.statusCode = 404;
      throw error;
    }
    return usuario
  }

  async findByEmail(email) {
    const usuario = await UsuarioRepository.findByEmail(email);
    if(!usuario){
      const error = new Error('Usuario não encontrado');
      error.statusCode = 404;
      throw error;
    }
  }

  async update(id, data) {
    await this.findById(id);
    return UsuarioRepository.update(Number(id), data);
  }

  async delete(id) {
    await this.findById(id);
    return UsuarioRepository.delete(Number(id));
  }
}

export default new UsuarioService();