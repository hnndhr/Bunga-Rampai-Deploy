import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  // Make the client public and readonly
  public readonly client: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (!url) throw new Error('SUPABASE_URL not found in .env');
    if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY not found in .env');

    this.client = createClient(url, key);
  }

  // The getClient() method is no longer necessary
}