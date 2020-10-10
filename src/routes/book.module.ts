import { MiddlewareConsumer, Module, NestModule, RequestMethod, HttpModule } from '@nestjs/common'
import { BookController, CategoryController } from '../controllers'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookEntity, CategoryEntity } from '../models'
import { BookService } from '../services'
import { CategoryService } from '../services/category.service'
import { AuthMiddleware } from '../middlewares'
import { UserModule } from './user.module'

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity, CategoryEntity]), UserModule, HttpModule],
    providers: [BookService, CategoryService],
    controllers: [BookController, CategoryController],
})
export class BookModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'books/fetch/:isbn', method: RequestMethod.GET },
                { path: 'books', method: RequestMethod.POST },
                { path: 'books/:id', method: RequestMethod.DELETE },
                { path: 'books/:id', method: RequestMethod.PUT },
            )
    }
}
