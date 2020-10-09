import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BookModule } from './book/book.module'
import { BookCategoryModule } from './book-category/book-category.module'
import { UserModule } from './user/user.module'

@Module({
    imports: [TypeOrmModule.forRoot(), BookModule, BookCategoryModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
