import UserRepository from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';
import JwtService from '../services/jwtService.js';

class UserService {

  async register(data) {

    if (!data.nome || !data.email || !data.senha) {
      const error = new Error('Todos os campos (nome, email e senha) são obrigatórios.');
      error.statusCode = 400;
      throw error;
    }
    if (!data.role) {
      data.role = 'MONITORA';
    }

    data.senha = await bcrypt.hash(data.senha, 10);

    return UserRepository.create(data);

  }

  async login(data) {
    
    if (!data.email || !data.senha) {
      const error = new Error('Os campos (email e senha) são obrigatórios.');
      error.statusCode = 400;
      throw error;
    }

    const user = await UserRepository.findByEmail(data.email);

    if(!user){
      const error = new Error('E-mail inválido');
      error.statusCode = 404;
      throw error;
    }

    const validatePassword = await bcrypt.compare(data.senha, user.senha);

    if(!validatePassword){
      const error = new Error('Senha inválida');
      error.statusCode = 404;
      throw error;
    }

    return JwtService.generateToken(user);

  }

  async findAll(){
    return UserRepository.findAll();
  }

  async findById(id) {

    const user = await UserRepository.findById(Number(id));

    if(!user){
      const error = new Error('Usuario não encontrado');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }

  async findByEmail(email) {

    const user = await UserRepository.findByEmail(email);

    if(!user){
      const error = new Error('Usuario não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return user;
  }

  async update(id, data) {
    await this.findById(id);
    return UserRepository.update(Number(id), data);
  }

  async delete(id) {
    await this.findById(id);
    return UserRepository.delete(Number(id));
  }
}

export default new UserService();