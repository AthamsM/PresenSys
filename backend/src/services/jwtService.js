import crypto from 'crypto'
import jwt from 'jsonwebtoken'

class JwtService {

    #secretKey = crypto.randomBytes(32).toString("hex");

    generateToken(data) {

        const user = {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role
        };

        const token = jwt.sign(user, this.#secretKey, {expiresIn: '12h'});

        return token;
    }

    verifyToken(token) {

        try {
            
            return jwt.verify(token, this.#secretKey);

        } catch {

            const error = new Error('Token inválido');
            error.statusCode = 401;
            throw error;
            
        }


    }

}

export default new JwtService();