import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  AdminLoginUseCase,
  GetSubscribersUseCase,
} from 'src/marketing/application/use-cases';
import {
  AdminLoginDto,
  GetSubscribersResponseDto,
  SubscriberDto,
} from '../dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FailedResponseDto, PaginationDto } from 'src/common/presentation/dto';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../guards';
import { UserRequest } from 'src/common/application/interfaces';
import { Admin } from 'src/marketing/domain/model';

@Controller('cms')
@ApiTags('cms')
export class CmsController {
  constructor(
    private readonly adminLoginUseCase: AdminLoginUseCase,
    private readonly getSubscribersUseCase: GetSubscribersUseCase,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Admin login into CMS' })
  @ApiBody({ type: AdminLoginDto })
  @ApiCreatedResponse({
    description: 'Admin logged in successfully',
    type: SubscriberDto,
  })
  @ApiBadRequestResponse({
    description: 'Wrong credentials',
    type: FailedResponseDto,
  })
  public async addSubscriber(
    @Request() request: ExpressRequest,
    @Body() data: AdminLoginDto,
  ) {
    return this.adminLoginUseCase.execute(data, request.res);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current session admin info' })
  @ApiCreatedResponse({
    description: 'Successfully fetch admin info',
    type: SubscriberDto,
  })
  @ApiBadRequestResponse({
    description: 'Not authorized',
    type: FailedResponseDto,
  })
  public async getAdminInfo(
    @Request() request: UserRequest<Exclude<Admin, 'password'>>,
  ) {
    return { admin: request.user };
  }

  @Get('subscribers')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List subscribers with pagination' })
  @ApiCreatedResponse({
    description: 'Paginated list',
    type: GetSubscribersResponseDto,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (max: 100, default: 20)',
    example: 20,
  })
  @ApiBadRequestResponse({
    description: 'Not authorized',
    type: FailedResponseDto,
  })
  async listSubscribers(@Query() pagination: PaginationDto) {
    return this.getSubscribersUseCase.execute(pagination);
  }
}
