import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdminLoginUseCase } from 'src/marketing/application/use-cases';
import { AdminLoginDto, AdminLoginResponseDto } from '../dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FailedResponseDto } from 'src/common/presentation/dto';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../guards';
import { UserRequest } from 'src/common/application/interfaces';
import { Admin } from 'src/marketing/domain/model';

@Controller('cms')
@ApiTags('cms')
export class CmsController {
  constructor(private readonly adminLoginUseCase: AdminLoginUseCase) {}

  @Post('login')
  @ApiOperation({ summary: 'Admin login into CMS' })
  @ApiBody({ type: AdminLoginDto })
  @ApiCreatedResponse({
    description: 'Admin logged in successfully',
    type: AdminLoginResponseDto,
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
    type: AdminLoginResponseDto,
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
}
