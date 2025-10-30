// src/modules/admins/admins.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { AuthService } from '../auth/auth.services.js';

@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: any) {
    const { username, password } = body;
    const result = await this.authService.login(username, password);

    if (!result) {
      return { status: 'ERROR', message: 'Invalid credentials' };
    }

    return { status: 'OK', token: result.token };
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('page') page: string = '1', 
    @Query('limit') limit: string = '10',
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    return this.adminsService.findAll(
      pageNum,
      limitNum
    )
  }

  //@UseGuards(JwtAuthGuard)
  @Post('create')
  async createAdmin(@Body() body: any) {
    const { data, error } = await this.adminsService.create(body);
    if (error) return { status: 'ERROR', error };
    return { status: 'OK', data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminsService.findById(id);
  }

  @Patch(':id')
  async updateAdmin(@Param('id') id: string, @Body() body: any) {
    const { data, error } = await this.adminsService.update(id, body);
    if (error) return { status: 'ERROR', error };
    return { status: 'OK', data };
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAdmin(@Param('id') id: string) {
    const { error } = await this.adminsService.remove(id);
    if (error) return { status: 'ERROR', error };
    return { status: 'OK' };
  }
}
