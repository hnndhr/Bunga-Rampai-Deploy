//backend\src\test.controller.ts

import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from './common/supabase.service.js';

@Controller('connect')
export class TestController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get('survey-articles')
  async connectSurvey() {
    const { data, error } = await this.supabase
      .client
      .from('survey_articles')
      .select('*');

    if (error) {
      return { status: 'ERROR', error };
    }

    return { status: 'OK', data };
  }

    @Get('admins')
  async connectAdmins() {
    const { data, error } = await this.supabase
      .client
      .from('admins')
      .select('*');

    if (error) {
      return { status: 'ERROR', error };
    }

    return { status: 'OK', data };
  }

    @Get('survey-article-blocks')
  async connectBlocks() {
    const { data, error } = await this.supabase
      .client
      .from('survey_article_blocks')
      .select('*')
      .limit(5);

    if (error) {
      return { status: 'ERROR', error };
    }

    return { status: 'OK', data };
  }
}
