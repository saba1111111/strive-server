import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  AddSubscriberUseCase,
  CountSubscribersUseCase,
} from 'src/marketing/application/use-cases';
import {
  AddSubscriberResponseDto,
  AddSubscriberRequestDto,
  CountSubscribersResponseDto,
} from '../dto';
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
  constructor(
    private readonly addSubscriberUseCase: AddSubscriberUseCase,
    private readonly countSubscribersUseCase: CountSubscribersUseCase,
  ) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Create a new subscriber' })
  @ApiBody({ type: AddSubscriberRequestDto })
  @ApiCreatedResponse({
    description: 'Subscriber created successfully',
    type: AddSubscriberResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    type: FailedResponseDto,
  })
  public async addSubscriber(@Body() data: AddSubscriberRequestDto) {
    return this.addSubscriberUseCase.execute(data);
  }

  @Get('subscribers/count')
  @ApiOperation({ summary: 'Get number of subscribers' })
  @ApiCreatedResponse({
    description: 'Number of subscribers',
    type: CountSubscribersResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'failed to count subscribers',
    type: FailedResponseDto,
  })
  public async countSubscribers() {
    return this.countSubscribersUseCase.execute();
  }
}
