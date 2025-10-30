import { CreateBlockDto } from "./create-blocks.dto.js";

export class CreateArticleDto {
  title!: string;
  slug!: string;
  header_image?: string | null;
  respondents?: number | null;
  author_username?: string | null;
  report_link?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  period?: string | null;
  method?: string | null;
  survey_type?: string | null;
  blocks?: CreateBlockDto[];
}
