import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const options = new DocumentBuilder()
    .setTitle('Api HackerNews Node')
    .setDescription('Api to get related articles about Node.js in Hacker News')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Docs - Api HackerNews Node'
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  await app.listen(AppModule.port)
}
bootstrap()
