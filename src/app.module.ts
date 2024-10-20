import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { ReservationModule } from './reservation/reservation.module';
import { ClodinaryModule } from './clodinary/clodinary.module';
import { CategoryModule } from './category/category.module';
import { PrismaService } from './prisma.service';
import { ArticleService } from './article/article.service';
import { AuthService } from './auth/auth.service';
import { ReservationService } from './reservation/reservation.service';
import { UsersService } from './users/users.service';
import { CloudinaryService } from './clodinary/clodinary.service';
import { CategoryService } from './category/category.service';

@Module({
  imports: [UsersModule, AuthModule, ArticleModule, ReservationModule, ClodinaryModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ArticleService, AuthService, ReservationService, UsersService, CloudinaryService, CategoryService],
})
export class AppModule { }
