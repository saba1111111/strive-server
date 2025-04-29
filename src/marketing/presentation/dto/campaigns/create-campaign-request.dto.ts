import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCampaignRequestDto {
  @ApiProperty({
    description: 'Internal name used for identifying the campaign internally',
    example: 'product_launch_may',
  })
  @IsString()
  @IsNotEmpty()
  internalName: string;

  @ApiProperty({
    description: 'Internal description explaining the purpose of the campaign',
    example: 'Campaign to announce May product launch to existing customers',
  })
  @IsString()
  @IsNotEmpty()
  internalDescription: string;

  @ApiProperty({
    description: 'Title shown to users when subscribing to the campaign',
    example: 'Be the first to know about our May launch!',
  })
  @IsString()
  @IsNotEmpty()
  publicTitle: string;

  @ApiProperty({
    description: 'Message or content users will see when they subscribe',
    example:
      'Subscribe now and get updates on our newest product releases before anyone else.',
  })
  @IsString()
  @IsNotEmpty()
  publicMessage: string;

  @ApiProperty({
    description: 'Campaign start date and time (ISO 8601 format)',
    example: '2025-06-01T00:00:00.000Z',
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate()
  startAt: Date;
}
