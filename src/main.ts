require('ts-node/register')

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
    const appOptions = { cors: true }
    const app = await NestFactory.create(AppModule, appOptions)
    app.enableCors()
    app.setGlobalPrefix('api')

    const options = new DocumentBuilder()
        .setTitle('Simple Book API')
        .setDescription('Simple Book Management API')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('/docs', app, document)

    await app.listen(process.env.PORT || 3000)
}
bootstrap()
