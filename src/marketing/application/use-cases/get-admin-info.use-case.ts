import { Inject, Injectable } from '@nestjs/common';
import { MarketingTokens } from '../enum';
import { IAdminsRepository } from '../interfaces';
import { handleError } from 'src/common/application/utils';
import { Admin } from 'src/marketing/domain/model';

@Injectable()
export class GetAdminInfoUseCase {
  constructor(
    @Inject(MarketingTokens.ADMINS_REPOSITORY)
    private readonly adminsRepository: IAdminsRepository,
  ) {}

  public async execute(id: number): Promise<Admin | null> {
    try {
      const admin = await this.adminsRepository.findOneById(id);

      return admin;
    } catch (error) {
      handleError(error);
    }
  }
}
