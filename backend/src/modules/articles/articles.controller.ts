import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service.js';
import { CreateArticleDto } from './dto/create-article.dto.js';
import { UpdateArticleDto } from './dto/update-article.dto.js';
import { CreateBlockDto } from './dto/create-blocks.dto.js';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  
  @Delete(':slug')
  async deleteArticle(@Param('slug') slug: string) {
    await this.articlesService.deleteArticleBySlug(slug);
  }
  
  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.articlesService.getSurveyArticlesWithBlocks(
      pageNumber,
      limitNumber,
    );
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }

  @Post()
  async createArticle(@Body() dto: CreateArticleDto) {
    return this.articlesService.createArticleWithBlocks(dto);
  }

  @Patch(':slug')
  async updateArticle(
    @Param('slug') slug: string,
    @Body() dto: UpdateArticleDto,
  ) {
    return this.articlesService.updateArticleBySlug(slug, dto);
  }


  // --- Endpoint untuk Blocks (sudah benar) ---
  @Post(':slug/blocks')
  async createBlocks(
    @Param('slug') slug: string,
    @Body() blocks: CreateBlockDto[],
  ) {
    return this.articlesService.createBlocksBulk(slug, blocks);
  }

  @Get(':slug/blocks')
  async getBlocks(@Param('slug') slug: string) {
    return this.articlesService.findBlocksBySlug(slug);
  }
}
