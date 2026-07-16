import JwtService from '../services/jwtService.js'

export const authVerification = (req, res, next) => {

    const auth = req.headers.authorization;

    if (!auth) {
      const error = new Error('Token não informado.');
      error.statusCode = 401;
      throw error;
    }

    const [bearer, token] = auth.split(' ');

    if (bearer !== "Bearer" || !token) {
      const error = new Error('Formato do token inválido');
      error.statusCode = 401;
      throw error;
    }

    try {

      const verify = JwtService.verifyToken(token);
      req.user = verify;

      console.log("\n\nV\n\n ->", verify)

      next();
        
    } catch (error) {

      return next(error);

    }

};