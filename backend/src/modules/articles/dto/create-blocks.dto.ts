export class CreateBlockDto {
  ordering!: number;
  block_type!: string;
  content!: any; // can be string or object
}
