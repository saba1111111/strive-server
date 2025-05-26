import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import {
  AdminLoginUseCase,
  CreateCampaignsUseCase,
  DeleteCampaignUseCase,
  EditCampaignUseCase,
  GetCampaignsUseCase,
  GetSubscribersUseCase,
} from 'src/marketing/application/use-cases';
import {
  AdminLoginDto,
  CreateCampaignRequestDto,
  CreateCampaignResponseDto,
  GetCampaignsResponseDto,
  GetSubscribersResponseDto,
  SubscriberDto,
  UpdateCampaignRequestDto,
} from '../dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FailedResponseDto, PaginationDto } from 'src/common/presentation/dto';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../guards';
import { UserRequest } from 'src/common/application/interfaces';
import { TAdminWithoutSensitiveInfo } from 'src/marketing/application/types';
import { AskModelsDto } from '../dto/llms';
import { AskModelsUseCase, GetLlmModelsResponsesUseCase } from 'src/marketing/application/use-cases/llms';

@Controller('cms')
@ApiTags('cms')
export class CmsController {
  constructor(
    private readonly adminLoginUseCase: AdminLoginUseCase,
    private readonly getSubscribersUseCase: GetSubscribersUseCase,
    private readonly createCampaignUseCase: CreateCampaignsUseCase,
    private readonly getCampaignsUseCase: GetCampaignsUseCase,
    private readonly editCampaignUseCase: EditCampaignUseCase,
    private readonly deleteCampaignUseCase: DeleteCampaignUseCase,
    private readonly askModelsUseCase: AskModelsUseCase,
    private readonly getLlmModelsResponsesUseCase: GetLlmModelsResponsesUseCase,
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
  public async addSubscriber(@Request() request: ExpressRequest, @Body() data: AdminLoginDto) {
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
  public async getAdminInfo(@Request() request: UserRequest<TAdminWithoutSensitiveInfo>) {
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

  @Post('campaigns')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create campaign' })
  @ApiCreatedResponse({
    description: 'Campaign created successfully',
    type: CreateCampaignResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Not authorized',
    type: FailedResponseDto,
  })
  @ApiBody({ type: CreateCampaignRequestDto })
  public async createCampaign(
    @Request() request: UserRequest<TAdminWithoutSensitiveInfo>,
    @Body() data: CreateCampaignRequestDto,
  ) {
    return this.createCampaignUseCase.execute(data, request.user);
  }

  @Get('campaigns')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get campaigns' })
  @ApiCreatedResponse({
    description: 'Campaigns fetched successfully',
    type: GetCampaignsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Not authorized',
    type: FailedResponseDto,
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
  public async getCampaigns(@Query() pagination: PaginationDto) {
    return this.getCampaignsUseCase.execute(pagination);
  }

  @Patch('campaigns/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update campaign by ID' })
  @ApiCreatedResponse({
    description: 'Campaign updated successfully',
    type: CreateCampaignResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Not authorized or update not allowed',
    type: FailedResponseDto,
  })
  public async updateCampaign(
    @Param('id') id: string,
    @Request() request: UserRequest<TAdminWithoutSensitiveInfo>,
    @Body() data: UpdateCampaignRequestDto,
  ) {
    const campaignId = parseInt(id, 10);
    return this.editCampaignUseCase.execute(campaignId, data, request.user);
  }

  @Delete('campaigns/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete campaign by ID' })
  @ApiCreatedResponse({
    description: 'Campaign deleted successfully',
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'Not authorized or delete not allowed',
    type: FailedResponseDto,
  })
  public async deleteCampaign(@Param('id') id: string, @Request() request: UserRequest<TAdminWithoutSensitiveInfo>) {
    const campaignId = parseInt(id, 10);
    return this.deleteCampaignUseCase.execute(campaignId, request.user);
  }

  @Post('llm/ask-models')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Ask models' })
  @ApiCreatedResponse({
    description: 'Models asked successfully',
    type: SubscriberDto,
  })
  @ApiBadRequestResponse({
    description: 'Not authorized',
    type: FailedResponseDto,
  })
  public async askModels(@Body() data: AskModelsDto, @Request() request: UserRequest<TAdminWithoutSensitiveInfo>) {
    return this.askModelsUseCase.execute(data, request.user);
  }

  @Get('llm/models-responses')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get models responses' })
  @ApiCreatedResponse({
    description: 'Models responses fetched successfully',
    type: GetCampaignsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Not authorized',
    type: FailedResponseDto,
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
  public async getModelsResponses(@Query() pagination: PaginationDto) {
    return this.getLlmModelsResponsesUseCase.execute(pagination);
  }
}
