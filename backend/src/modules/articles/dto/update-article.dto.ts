import { CreateBlockDto } from './create-blocks.dto.js';

export class UpdateArticleDto {
  title?: string;
  header_image?: string | null;
  respondents?: number | null;
  period?: string | null;
  method?: string | null;
  survey_type?: string | null;
  author_username?: string | null;
  // replace blocks wholesale (optional)
  blocks?: CreateBlockDto[];
}
