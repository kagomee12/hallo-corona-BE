import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { ReservationModule } from './reservation/reservation.module';
import { ClodinaryModule } from './clodinary/clodinary.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UsersModule, AuthModule, ArticleModule, ReservationModule, ClodinaryModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
