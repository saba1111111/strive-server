import { ApiProperty } from '@nestjs/swagger';

export class BasePaginationResultDto {
  @ApiProperty({
    description: 'Total number of items',
    example: 150,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Maximum number of items returned per page',
    example: 20,
  })
  limit: number;
}
