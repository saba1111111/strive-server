import { ApiProperty } from '@nestjs/swagger';
import { CampaignStatus } from 'src/marketing/domain/enum';

export class CampaignDto {
  @ApiProperty({
    description: 'Unique campaign identifier',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Campaign name',
    example: 'Spring Sale',
  })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the campaign',
    example: 'Annual spring marketing campaign offering 20% off all items',
  })
  description: string;

  @ApiProperty({
    description: 'Campaign start date and time (ISO 8601)',
    example: '2025-05-01T00:00:00.000Z',
    format: 'date-time',
  })
  startAt: Date;

  @ApiProperty({
    description: 'Campaign end date and time (ISO 8601)',
    example: '2025-05-31T23:59:59.000Z',
    format: 'date-time',
  })
  endAt: Date;

  @ApiProperty({
    description: 'ID of the admin who owns this campaign',
    example: 42,
  })
  adminId: number;

  @ApiProperty({
    description: 'Current status of the campaign',
    enum: CampaignStatus,
    example: CampaignStatus.InProgress,
  })
  status: CampaignStatus;

  @ApiProperty({
    description: 'Email address of the admin owner (nullable if admin removed)',
    example: 'admin@example.com',
    nullable: true,
  })
  adminEmail: string | null;
}
