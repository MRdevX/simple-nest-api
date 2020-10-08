import { Module } from '@nestjs/common';
import { BookCategoryService } from './book-category.service';

@Module({
  providers: [BookCategoryService]
})
export class BookCategoryModule {}
