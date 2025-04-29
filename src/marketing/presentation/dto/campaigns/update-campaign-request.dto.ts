import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCampaignRequestDto {
  @ApiPropertyOptional({
    description: 'Internal name used for identifying the campaign internally',
    example: 'product_launch_may',
  })
  @IsString()
  @IsOptional()
  internalName?: string;

  @ApiPropertyOptional({
    description: 'Internal description explaining the purpose of the campaign',
    example: 'Campaign to announce May product launch to existing customers',
  })
  @IsString()
  @IsOptional()
  internalDescription?: string;

  @ApiPropertyOptional({
    description: 'Title shown to users when subscribing to the campaign',
    example: 'Be the first to know about our May launch!',
  })
  @IsString()
  @IsOptional()
  publicTitle?: string;

  @ApiPropertyOptional({
    description: 'Message or content users will see when they subscribe',
    example:
      'Subscribe now and get updates on our newest product releases before anyone else.',
  })
  @IsString()
  @IsOptional()
  publicMessage?: string;

  @ApiPropertyOptional({
    description: 'Campaign start date and time (ISO 8601 format)',
    example: '2025-06-01T00:00:00.000Z',
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startAt?: Date;
}
