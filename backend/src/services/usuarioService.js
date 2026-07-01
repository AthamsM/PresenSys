import UsuarioRepository from '../repositories/usuarioRepository.js';

class UsuarioService {
  async create(data) {
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
    return UsuarioRepository.create(data);
  }

  async findAll(){
    return UsuarioRepository.findAll();
  }

  async login(data) {
    // busca o email e senha pelo findById do repository
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