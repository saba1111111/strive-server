import { InjectRepository } from '@nestjs/typeorm';
import { ILlmResponsesRepository } from 'src/marketing/application/interfaces';
import { LlmResponseEntity } from '../entities';
import { Repository } from 'typeorm';
import { TSaveLlmResponseRequest } from 'src/marketing/application/types';
import { Injectable } from '@nestjs/common';
import { LlmResponseWithAdminInfo } from 'src/marketing/domain/model/llm-response.model';
import { TGetPaginatedDataQuery } from 'src/common/application/types';

@Injectable()
export class LlmResponsesTypeormRepository implements ILlmResponsesRepository {
  constructor(
    @InjectRepository(LlmResponseEntity)
    private readonly repo: Repository<LlmResponseEntity>,
  ) {}

  public async addResponses(data: TSaveLlmResponseRequest[]): Promise<boolean> {
    await this.repo.save(data);
    return true;
  }

  public async findAll(options: TGetPaginatedDataQuery): Promise<{ items: LlmResponseWithAdminInfo[]; total: number }> {
    const { page, limit } = options;
    const [entities, total] = await this.repo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.admin', 'admin')
      .orderBy('c.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const items = entities.map((e) => this.mapEntityToModel(e));
    return { items, total };
  }

  private mapEntityToModel(entity: LlmResponseEntity): LlmResponseWithAdminInfo {
    return {
      id: entity.id,
      adminId: entity.admin.id,
      adminEmail: entity.admin.email,
      prompt: entity.prompt,
      response: entity.response,
      model: entity.model,
      createdAt: entity.createdAt,
    };
  }
}
