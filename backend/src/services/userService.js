import UserRepository from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';
import JwtService from '../services/jwtService.js';

class UserService {

  async register(data) {

    if (!data.name || !data.email || !data.password) {
      const error = new Error('Todos os campos (name, email e password) são obrigatórios.');
      error.statusCode = 400;
      throw error;
    }
    if (!data.role) {
      data.role = 'MONITORA';
    }

    data.password = await bcrypt.hash(data.password, 10);

    return UserRepository.create(data);

  }

  async login(data) {
    
    if (!data.email || !data.password) {
      const error = new Error('Os campos (email e password) são obrigatórios.');
      error.statusCode = 400;
      throw error;
    }

    const user = await UserRepository.findByEmail(data.email);

    if(!user){
      const error = new Error('E-mail inválido');
      error.statusCode = 404;
      throw error;
    }

    const validatePassword = await bcrypt.compare(data.password, user.password);

    if(!validatePassword){
      const error = new Error('password inválida');
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
    data.password = await bcrypt.hash(data.password, 10);
    return UserRepository.update(Number(id), data);
  }

  async delete(id) {
    await this.findById(id);
    return UserRepository.delete(Number(id));
  }
}

export default new UserService();