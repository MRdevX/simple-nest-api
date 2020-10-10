import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { AppController } from '../controllers/app.controller'
import { AppService } from '../services/app.service'
import { BookModule, UserModule, CategoryModule } from '.'

@Module({
    imports: [TypeOrmModule.forRoot(), BookModule, CategoryModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
