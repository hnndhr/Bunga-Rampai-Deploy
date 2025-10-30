// src/modules/admins/admins.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase.service.js';
import * as bcrypt from 'bcrypt';
import { SupabaseClient } from '@supabase/supabase-js';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AdminsService {
  constructor(private readonly supabase: SupabaseService) {}

  async validateAdmin(username: string, password: string) {
    const supabase = this.supabase.client;

    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !admin) return null;

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return null;

    return admin;
  }

  async findAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const client = this.supabase.client;

    const { data, error, count } = await client
      .from('admins')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return {
      status: 'OK',
      data,
      meta: {
        total: count || 0,
        page,
        limit,
        totalPages,
      },
    };
  }

  async create(data: any) {
    const hashed = await bcrypt.hash(data.password, 10);
    const newAdmin = { ...data, password: hashed };

    return this.supabase.client.from('admins').insert(newAdmin).select();
  }

  async findById(id: string) {
    const { data, error } = await this.supabase.client
      .from('admins')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Admin tidak ditemukan');
    }

    return data;
  }

  async update(id: string, data: any) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.supabase.client
      .from('admins')
      .update(data)
      .eq('id', id)
      .select();
  }

  async remove(id: string) {
    return this.supabase.client.from('admins').delete().eq('id', id);
  }
}
