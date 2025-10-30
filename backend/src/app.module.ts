import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TestController } from './test.controller.js';
import { SupabaseService } from './common/supabase.service.js';
import { AdminsModule } from './modules/admins/admins.module.js';
import { ArticlesModule } from './modules/articles/articles.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AdminsModule,
    ArticlesModule,
  ],
  controllers: [AppController, TestController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
