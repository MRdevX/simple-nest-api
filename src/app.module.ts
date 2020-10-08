import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [],
  controllers: [AppController, BookController, UserController],
  providers: [AppService],
})
export class AppModule {}
