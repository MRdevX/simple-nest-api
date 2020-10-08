import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { UserController } from './user/user.controller';
import { BookCategoryController } from './book-category/book-category.controller';
import { BookModule } from './book/book.module';
import { BookCategoryModule } from './book-category/book-category.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BookModule, BookCategoryModule, UserModule],
  controllers: [AppController, BookController, UserController, BookCategoryController],
  providers: [AppService],
})
export class AppModule {}
