import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { config } from '../../config/default';
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(req.method === 'OPTIONS') return next();

    try {
      const token = (req.headers.auth as string).split(' ')[1];

      if(!token) return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'no_authorization' });

      const decoded = jwt.verify(token, config.jwt_secret);
      req['user'] = decoded;

      next();

    } catch {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'no_authorization' });
    }
  }
}
