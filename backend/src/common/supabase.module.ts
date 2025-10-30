import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service.js';

@Module({
  // 'providers' are the services that belong to this module.
  providers: [SupabaseService],
  // 'exports' makes the providers available to any other module that imports this one.
  exports: [SupabaseService],
})
export class SupabaseModule {}