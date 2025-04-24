import { SecurityTokens } from 'src/common/domain/enum';

export interface TokenConfig {
  secret: string;
  expiresInSeconds: number;
}

export interface ITokenService {
  signAccessToken(payload: object, config?: TokenConfig): Promise<string>;
  signRefreshToken(payload: object, config?: TokenConfig): Promise<string>;
  verifyToken<T>(token: string, type: SecurityTokens): Promise<T | null>;
}
