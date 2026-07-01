import crypto from 'crypto'
import jwt from 'jsonwebtoken'

class JwtService {

    #chaveSecreta = crypto.randomBytes(32).toString("hex");

    async gerarToken(data) {

        const user = {
            id: data.id,
            nome: data.nome,
            email: data.email,
            role: data.role
        };

        const token = jwt.sign(user, this.#chaveSecreta);

        return token;
    }

}

export default new JwtService();