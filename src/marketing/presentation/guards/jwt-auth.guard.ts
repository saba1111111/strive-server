import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { SharedTokens } from 'src/common/application/enum';
import { ITokenService } from 'src/common/application/interfaces';
import { SecurityTokens } from 'src/common/domain/enum';
import { GetAdminInfoUseCase } from 'src/marketing/application/use-cases/get-admin-info.use-case';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(SharedTokens.TOKEN_SERVICE_PROVIDER)
    private readonly tokenService: ITokenService,
    private readonly configService: ConfigService,
    private readonly getAdminInfoUseCase: GetAdminInfoUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request) {
      throw new UnauthorizedException('Invalid request context');
    }

    const accessToken = request.cookies?.[SecurityTokens.ACCESS_TOKEN];

    if (accessToken) {
      try {
        const secretKey = this.configService.get('CMS_ACCESS_TOKEN_SECRET');
        const accessPayload = await this.tokenService.verifyToken<{
          id: number;
          email: string;
        }>(accessToken, secretKey);

        if (accessPayload) {
          const admin = await this.getAdminInfoUseCase.execute(
            accessPayload.id,
          );
          if (!admin) {
            throw new UnauthorizedException('Invalid access token');
          }

          (request as any).user = admin;
          return true;
        }
      } catch (err) {
        throw new UnauthorizedException('Invalid access token');
      }
    }
  }
}
