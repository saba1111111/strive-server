import { Injectable } from '@nestjs/common';
import { JwtService as JWT } from '@nestjs/jwt';
import { ITokenService, TokenConfig } from '../application/interfaces';

@Injectable()
export class JwtService implements ITokenService {
  public constructor(private readonly jwtService: JWT) {}

  public signToken(payload: object, config: TokenConfig): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: config.secret,
      expiresIn: config.expiresInSeconds + 's',
    });
  }

  public async verifyToken<T>(
    token: string,
    secret: string,
  ): Promise<T | null> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret,
      });
      return payload as T;
    } catch (error) {
      return null;
    }
  }
}
