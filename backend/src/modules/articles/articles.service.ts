import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CreateArticleDto } from './dto/create-article.dto.js';
import { CreateBlockDto } from './dto/create-blocks.dto.js';
import { UpdateArticleDto } from './dto/update-article.dto.js';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ArticlesService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(ArticlesService.name);

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;
    if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_KEY required');
    this.supabase = createClient(url, key);
  }

  // Find by slug (returns article + parsed blocks)
  async findBySlug(slug: string) {
    const { data: article, error: articleError } = await this.supabase
      .from('survey_articles')
      .select('*')
      .eq('slug', slug)
      .limit(1)
      .single();

    if (articleError || !article) {
      throw new Error('Article not found');
    }

    const { data: blocks } = await this.supabase
      .from('survey_article_blocks')
      .select('*')
      .eq('slug_survey', slug)
      .order('ordering', { ascending: true });

    const parsedBlocks = (blocks || []).map((b: any) => {
      let contentParsed = null;
      try {
        contentParsed = b.content ? JSON.parse(b.content) : null;
      } catch {
        contentParsed = b.content;
      }
      return {
        id: b.id,
        ordering: b.ordering,
        block_type: b.block_type,
        content: contentParsed,
      };
    });

    return {
      ...article,
      blocks: parsedBlocks,
    };
  }

  async findAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const { data, error, count } = await this.supabase
      .from('survey_articles')
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

  async findBlocksBySlug(slug: string) {
    const { data: blocks, error } = await this.supabase
      .from('survey_article_blocks')
      .select('*')
      .eq('slug_survey', slug)
      .order('ordering', { ascending: true });

    if (error) throw error;

    // Parse JSON content back
    return (blocks || []).map((b: any) => {
      let parsed: any = null;
      try {
        parsed = b.content ? JSON.parse(b.content) : null;
      } catch {
        parsed = b.content;
      }
      return {
        id: b.id,
        ordering: b.ordering,
        block_type: b.block_type,
        content: parsed,
      };
    });
  }

  // Create article + blocks in one request. If blocks insert fails, rollback (delete article).
  async createArticleWithBlocks(dto: CreateArticleDto) {
    const { blocks, ...articlePayload } = dto;

    // ensure slug present
    if (!articlePayload.slug) {
      throw new Error('slug is required');
    }

    // 1) Insert article (without blocks)
    const { data: articleData, error: articleError } = await this.supabase
      .from('survey_articles')
      .insert([articlePayload])
      .select('id,slug')
      .single();

    if (articleError) {
      this.logger.error('Failed to insert article', articleError);
      throw articleError;
    }

    const insertedSlug =
      (articleData && articleData.slug) || articlePayload.slug;
    let insertedBlocks: any[] = [];

    // 2) Insert blocks bulk (if provided)
    if (Array.isArray(blocks) && blocks.length > 0) {
      const payload = blocks.map((b: CreateBlockDto, idx: number) => ({
        ordering: typeof b.ordering === 'number' ? b.ordering : idx + 1,
        block_type: b.block_type,
        content:
          typeof b.content === 'string' ? b.content : JSON.stringify(b.content),
        slug_survey: insertedSlug,
      }));

      const { data: blocksData, error: blocksError } = await this.supabase
        .from('survey_article_blocks')
        .insert(payload)
        .select();

      if (blocksError) {
        this.logger.error(
          'Failed to insert blocks; rolling back article',
          blocksError,
        );
        // rollback: delete inserted article to keep consistency
        await this.supabase
          .from('survey_articles')
          .delete()
          .eq('slug', insertedSlug);

        throw blocksError;
      }

      insertedBlocks = blocksData || [];
    }

    return {
      article: articleData,
      blocks: insertedBlocks,
    };
  }

  // Update article metadata and optionally replace blocks (complete replace)
  async updateArticleBySlug(slug: string, dto: UpdateArticleDto) {
    // update article fields if provided
    const { blocks, ...articleFields } = dto;

    if (Object.keys(articleFields).length > 0) {
      const { data: updatedArticle, error: updateError } = await this.supabase
        .from('survey_articles')
        .update(articleFields)
        .eq('slug', slug)
        .select()
        .single();

      if (updateError) throw updateError;
    }

    // if blocks passed -> delete existing blocks for slug and insert new ones
    let insertedBlocks: any[] = [];
    if (Array.isArray(blocks)) {
      // delete existing
      const { error: delErr } = await this.supabase
        .from('survey_article_blocks')
        .delete()
        .eq('slug_survey', slug);

      if (delErr) throw delErr;

      if (blocks.length > 0) {
        const payload = blocks.map((b: CreateBlockDto, idx: number) => ({
          ordering: typeof b.ordering === 'number' ? b.ordering : idx + 1,
          block_type: b.block_type,
          content:
            typeof b.content === 'string'
              ? b.content
              : JSON.stringify(b.content),
          slug_survey: slug,
        }));

        const { data: blocksData, error: blocksError } = await this.supabase
          .from('survey_article_blocks')
          .insert(payload)
          .select();

        if (blocksError) throw blocksError;
        insertedBlocks = blocksData || [];
      }
    }

    return { message: 'updated', insertedBlocksCount: insertedBlocks.length };
  }

  // Delete article and its blocks
  async deleteArticleBySlug(slug: string) {
    // delete blocks first
    const { error: delBlocksErr } = await this.supabase
      .from('survey_article_blocks')
      .delete()
      .eq('slug_survey', slug);

    if (delBlocksErr) throw delBlocksErr;

    const { data: deletedArticle, error: delArticleErr } = await this.supabase
      .from('survey_articles')
      .delete()
      .eq('slug', slug)
      .select()
      .single();

    if (delArticleErr) throw delArticleErr;

    return { deletedArticle };
  }

  async createBlocksBulk(slug: string, blocks: CreateBlockDto[]) {
    if (!slug) {
      throw new BadRequestException('slug parameter is required');
    }

    if (!Array.isArray(blocks) || blocks.length === 0) {
      return { inserted: 0, data: [] };
    }

    // Build payload for bulk insert: stringify non-string content
    const payload = blocks.map((b: CreateBlockDto, idx: number) => ({
      ordering: typeof b.ordering === 'number' ? b.ordering : idx + 1,
      block_type: b.block_type,
      content:
        typeof b.content === 'string' ? b.content : JSON.stringify(b.content),
      slug_survey: slug,
    }));

    // Run bulk insert
    const { data, error } = await this.supabase
      .from('survey_article_blocks')
      .insert(payload)
      .select(); // return inserted rows

    if (error) {
      this.logger.error('Supabase insert blocks error', error);
      // rethrow so controller can return proper 4xx/5xx
      throw error;
    }

    return { inserted: (data || []).length, data };
  }

  // GET survey articles with blocks
  async getSurveyArticlesWithBlocks(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const {
      data: articles,
      error: articlesError,
      count,
    } = await this.supabase
      .from('survey_articles')
      .select('*', { count: 'exact' })
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (articlesError) throw articlesError;

    const articlesWithBlocks = await Promise.all(
      (articles || []).map(async (article) => {
        const { data: blocks, error: blocksError } = await this.supabase
          .from('survey_article_blocks')
          .select('*')
          .eq('slug_survey', article.slug)
          .order('ordering', { ascending: true });

        if (blocksError) return { ...article, blocks: [] };

        const parsed = (blocks || []).map((b: any) => {
          let contentParsed = null;
          try {
            contentParsed = b.content ? JSON.parse(b.content) : null;
          } catch {
            contentParsed = b.content;
          }
          return {
            id: b.id,
            ordering: b.ordering,
            block_type: b.block_type,
            content: contentParsed,
          };
        });

        return { ...article, blocks: parsed };
      }),
    );

    return {
      status: 'OK',
      data: articlesWithBlocks,
      meta: {
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
        total: count || 0,
      },
    };
  }
}
