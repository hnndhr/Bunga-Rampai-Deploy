// src/modules/admins/admins.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { AdminsController } from './admins.controller.js';
import { AdminsService } from './admins.service.js';
import { SupabaseService } from '../../common/supabase.service.js';
import { AuthModule } from '../auth/auth.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, SupabaseService],
  imports: [
    forwardRef (() => AuthModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'RNDOLANNN BUNGA RAMPAI 2025',
      signOptions: { expiresIn: '10s' },
    }),
  ],
  exports: [
    AdminsService
  ]
})
export class AdminsModule {}
