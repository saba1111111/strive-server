export interface TokenConfig {
  secret: string;
  expiresInSeconds: number;
}

export interface ITokenService {
  signToken(payload: object, config: TokenConfig): Promise<string>;
  verifyToken<T>(token: string, secret: string): Promise<T | null>;
}
