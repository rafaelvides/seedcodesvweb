import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decodedToken = this.jwtService.verify(token);
        req.user = decodedToken; // Almacena los datos del token decodificado en la propiedad 'user' del objeto de solicitud (req)
        next();
      } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
      }
    } else {
      res.status(401).json({ message: 'Token no proporcionado' });
    }
  }
}
