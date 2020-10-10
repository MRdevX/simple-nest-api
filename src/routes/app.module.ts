import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { AppController } from '../controllers/app.controller'
import { AppService } from '../services/app.service'
import { BookModule, UserModule, CategoryModule } from '.'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            // host: process.env.TYPEORM_HOST,
            // port: 5432,
            // username: process.env.TYPEORM_USERNAME,
            // password: process.env.TYPEORM_PASSWORD,
            // database: process.env.TYPEORM_DATABASE,
            entities: ['src/models/*.entity.ts', 'dist/models/*.entity.js'],
            synchronize: true,
        }),
        BookModule,
        CategoryModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
