import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { resolve } from 'path'
import { writeFileSync } from 'fs'

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

  // Export documentation of "openapi-definition" in file json
  const outputPath = resolve(process.cwd(), resolve('docs', 'swagger.json'));
  writeFileSync(outputPath, JSON.stringify(document), { encoding: 'utf8' });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  await app.listen(AppModule.port)
  Logger.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
