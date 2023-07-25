import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {} from '../role/role.entity'
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Verificar si el token existe en la cabecera de autorización
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó un token de autorización' });
    }

    try {
      // Verificar y decodificar el token JWT
      const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
      
      if (typeof decoded === 'string') {
        // Manejar el caso en el que el token no se pudo decodificar correctamente
      } else {
        // Verificar el rol del usuario
        if (decoded.rol === 'admin') {
          // Si el usuario tiene el rol de administrador, permitir el acceso
          next()
        } else {
          // Si el usuario no tiene el rol de administrador, denegar el acceso
          return res.status(403).json({ message: 'No tiene permisos para acceder a este recurso' });
        }
      }
    } catch (error) {
      // Si el token no es válido, devolver un error de autenticación
      return res.status(401).json({ message: 'Token de autorización inválido' });
    }
  }
}
