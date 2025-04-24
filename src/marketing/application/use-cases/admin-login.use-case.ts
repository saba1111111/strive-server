import { Inject, Injectable } from '@nestjs/common';
import { MarketingTokens } from '../enum';
import { IAdminsRepository } from '../interfaces';
import { getDateAfter, handleError } from 'src/common/application/utils';
import { AdminNotFoundException } from '../exceptions';
import { SharedTokens } from 'src/common/application/enum';
import { IHashService, ITokenService } from 'src/common/application/interfaces';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { SecurityTokens } from 'src/common/domain/enum';

@Injectable()
export class AdminLoginUseCase {
  constructor(
    @Inject(MarketingTokens.ADMINS_REPOSITORY)
    private readonly adminsRepository: IAdminsRepository,
    @Inject(SharedTokens.HASH_SERVICE_PROVIDER)
    private readonly hashServiceProvider: IHashService,
    @Inject(SharedTokens.TOKEN_SERVICE_PROVIDER)
    private readonly tokenService: ITokenService,
    private readonly configService: ConfigService,
  ) {}

  public async execute(
    data: { email: string; password: string },
    res: Response,
  ): Promise<{ admin: { id: number; email: string } }> {
    try {
      const admin = await this.adminsRepository.findOneByEmail(data.email);
      if (!admin) {
        throw new AdminNotFoundException(data.email);
      }

      const isPasswordValid = await this.hashServiceProvider.compare(
        data.password,
        admin.password,
      );
      if (!isPasswordValid) {
        // if password is not valid, throw not found error to not expose who is registered and who is not
        throw new AdminNotFoundException(data.email);
      }

      await this.generateAndSetAccessToken(
        { id: admin.id, email: admin.email },
        res,
      );

      return {
        admin: {
          id: admin.id,
          email: admin.email,
        },
      };
    } catch (error) {
      handleError(error);
    }
  }

  public async generateAndSetAccessToken(payload: object, res: Response) {
    const accessTokenExpirationInSeconds = this.configService.get(
      'CMS_ACCESS_TOKEN_EXPIRATION_TIME',
    );
    const accessToken = await this.tokenService.signAccessToken(payload, {
      secret: this.configService.get('CMS_ACCESS_TOKEN_SECRET'),
      expiresInSeconds: accessTokenExpirationInSeconds,
    });

    const accessExpireDate = getDateAfter(
      Number(accessTokenExpirationInSeconds),
    );
    res.cookie(SecurityTokens.ACCESS_TOKEN, accessToken, {
      httpOnly: false,
      expires: accessExpireDate,
    });
  }
}
