import { Body, Controller, Post } from '@nestjs/common';
import { AddSubscriberUseCase } from 'src/marketing/application/use-cases';
import { AddSubscriberResponseDto, AddSubscriberDto } from '../dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FailedResponseDto } from 'src/common/presentation/dto';

@Controller('marketing')
@ApiTags('marketing')
export class MarketingController {
  constructor(private readonly addSubscriberUseCase: AddSubscriberUseCase) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Create a new subscriber' })
  @ApiBody({ type: AddSubscriberDto })
  @ApiCreatedResponse({
    description: 'Subscriber created successfully',
    type: AddSubscriberResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    type: FailedResponseDto,
  })
  public async addSubscriber(@Body() data: AddSubscriberDto) {
    return this.addSubscriberUseCase.execute(data);
  }
}
