import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { BookController, CategoryController } from '../controllers'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookEntity, CategoryEntity } from '../models'
import { BookService } from '../services'
import { CategoryService } from '../services/category.service'
import { AuthMiddleware } from '../middlewares'
import { UserModule } from './user.module'

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
