// src/modules/auth/auth.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.services.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { username, password } = body;

    // panggil login dengan 2 argumen
    const result = await this.authService.login(username, password);

    if (!result) {
      return { status: 'ERROR', message: 'Invalid credentials' };
    }

    return { status: 'OK', token: result.token };
  }
}
