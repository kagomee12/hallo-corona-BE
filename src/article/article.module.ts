import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { PrismaService } from 'src/prisma.service';
import { ClodinaryModule } from 'src/clodinary/clodinary.module';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, PrismaService],
  imports: [ClodinaryModule]
})
export class ArticleModule {}
