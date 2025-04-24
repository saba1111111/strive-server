import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as JWT } from '@nestjs/jwt';
import { ITokenService, TokenConfig } from '../application/interfaces';
import { SecurityTokens } from '../domain/enum';

@Injectable()
export class JwtService implements ITokenService {
  public constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JWT,
  ) {}

  public signAccessToken(
    payload: object,
    config?: TokenConfig,
  ): Promise<string> {
    const secret =
      config?.secret || this.configService.get<string>('ACCESS_TOKEN_SECRET');
    const expiresIn =
      (config?.expiresInSeconds ||
        this.configService.get<string>('ACCESS_TOKEN_EXPIRATION_TIME')) + 's';

    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }

  public signRefreshToken(
    payload: object,
    config?: TokenConfig,
  ): Promise<string> {
    const secret =
      config?.secret || this.configService.get<string>('REFRESH_TOKEN_SECRET');
    const expiresIn =
      (config?.expiresInSeconds ||
        this.configService.get<string>('REFRESH_TOKEN_EXPIRATION_TIME')) + 's';

    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }

  public async verifyToken<T>(
    token: string,
    type: SecurityTokens,
  ): Promise<T | null> {
    try {
      const secret =
        type === SecurityTokens.ACCESS_TOKEN
          ? this.configService.get<string>('ACCESS_TOKEN_SECRET')
          : this.configService.get<string>('REFRESH_TOKEN_SECRET');

      const payload = await this.jwtService.verifyAsync(token, { secret });
      return payload as T;
    } catch (error) {
      return null;
    }
  }
}
