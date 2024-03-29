// src/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'fsrEBGmlpuAJPwJ0gs5AUQ==', // Hashed Secret Key
    });
  }

  async validate(payload: any) {
    return { id: payload.id, role: payload.role, userId: payload.userId };
  }
}
