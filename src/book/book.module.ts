import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { BookController } from './book.controller'
import { CategoryController } from '../category/category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookEntity } from './book.entity'
import { CategoryEntity } from '../category/category.entity'
import { BookService } from './book.service'
import { CategoryService } from '../category/category.service'
import { AuthMiddleware } from '../user/auth.middleware'
import { UserModule } from '../user/user.module'

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity, CategoryEntity]), UserModule],
    providers: [BookService, CategoryService],
    controllers: [BookController, CategoryController],
})
export class BookModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'books/feed', method: RequestMethod.GET },
                { path: 'books', method: RequestMethod.POST },
                { path: 'books/:slug', method: RequestMethod.DELETE },
                { path: 'books/:slug', method: RequestMethod.PUT },
            )
    }
}
