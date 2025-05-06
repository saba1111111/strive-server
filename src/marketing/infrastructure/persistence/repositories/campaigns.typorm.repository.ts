import { ICampaignsRepository } from 'src/marketing/application/interfaces';
import { TCreateCampaignRepository, TEditCampaignQuery } from 'src/marketing/application/types';
import { Campaign, CampaignWithAdminInfo } from 'src/marketing/domain/model';
import { CampaignEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TGetPaginatedDataQuery, TGetPaginatedDataResult } from 'src/common/application/types';
import { Injectable } from '@nestjs/common';
import { CampaignStatus } from 'src/marketing/domain/enum';

@Injectable()
export class CampaignsTypeormRepository implements ICampaignsRepository {
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly repo: Repository<CampaignEntity>,
  ) {}

  public async create(campaign: TCreateCampaignRepository): Promise<Campaign> {
    const entity = await this.repo.save(campaign);

    return this.mapEntityToCampaignModel(entity);
  }

  public async findAll(options: TGetPaginatedDataQuery): Promise<TGetPaginatedDataResult<CampaignWithAdminInfo>> {
    const { page, limit } = options;
    const [entities, total] = await this.repo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.admin', 'admin')
      .orderBy('c.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const items = entities.map((e) => this.mapEntityToCampaignWithAdminInfoModel(e));
    return { items, total };
  }

  public async edit(id: number, campaignData: TEditCampaignQuery): Promise<Campaign> {
    await this.repo.update(id, campaignData);
    const entity = await this.repo.findOneBy({ id });
    return this.mapEntityToCampaignModel(entity);
  }

  public async delete(id: number): Promise<boolean> {
    await this.repo.delete(id);
    return true;
  }

  public async findOne(id: number): Promise<Campaign> {
    const entity = await this.repo.findOneBy({ id });

    return entity ? this.mapEntityToCampaignModel(entity) : null;
  }

  public async findActiveCampaign(): Promise<Campaign> {
    const entity = await this.repo.findOneBy({
      status: CampaignStatus.InProgress,
    });

    return entity ? this.mapEntityToCampaignModel(entity) : null;
  }

  public async findCampaignWhichNeedToStart(): Promise<Campaign> {
    const entity = await this.repo
      .createQueryBuilder('c')
      .where('c.status = :status', { status: CampaignStatus.NotStarted })
      .andWhere('c.startAt <= NOW()')
      .orderBy('c.startAt', 'ASC')
      .getOne();

    return entity ? this.mapEntityToCampaignModel(entity) : null;
  }

  private mapEntityToCampaignModel(entity: CampaignEntity): Campaign {
    return {
      id: entity.id,
      internalName: entity.internalName,
      internalDescription: entity.internalDescription,
      publicTitle: entity.publicTitle,
      publicMessage: entity.publicMessage,
      startAt: entity.startAt,
      endAt: entity.endAt,
      adminId: entity.adminId,
      status: entity.status,
    };
  }

  private mapEntityToCampaignWithAdminInfoModel(entity: CampaignEntity): CampaignWithAdminInfo {
    return {
      ...this.mapEntityToCampaignModel(entity),
      adminEmail: entity.admin?.email ?? null,
    };
  }
}
