import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { BookController, CategoryController } from '../controllers'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookEntity, CategoryEntity } from '../models'
import { CategoryService } from '../services/category.service'
import { BookService } from '../services/book.service'
import { AuthMiddleware } from '../middlewares'
import { UserModule } from './user.module'

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity, BookEntity]), UserModule],
    providers: [CategoryService, BookService],
    controllers: [CategoryController, BookController],
})
export class CategoryModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'categories/feed', method: RequestMethod.GET },
                { path: 'categories', method: RequestMethod.POST },
                { path: 'categories/:id', method: RequestMethod.DELETE },
                { path: 'categories/:id', method: RequestMethod.PUT },
            )
    }
}
