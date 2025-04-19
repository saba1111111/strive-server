import { ApiProperty } from '@nestjs/swagger';

export class FailedResponseDto {
  @ApiProperty({ example: 'error message' })
  message: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}
