import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { BookController } from '../book/book.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryEntity } from './category.entity'
import { BookEntity } from '../book/book.entity'
import { CategoryService } from './category.service'
import { BookService } from '../book/book.service'
import { AuthMiddleware } from '../user/auth.middleware'
import { UserModule } from '../user/user.module'

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
                { path: 'categories/:slug', method: RequestMethod.DELETE },
                { path: 'categories/:slug', method: RequestMethod.PUT },
            )
    }
}
