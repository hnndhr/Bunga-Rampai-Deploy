import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Perbolehkan dua origin: local + vercel (nanti diupdate setelah domain vercel muncul)
  app.enableCors({
    origin: [
      'http://localhost:3000',
      /\.vercel\.app$/, 
    ],
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
