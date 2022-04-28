import { DynamicModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { ConnectionOptions } from 'typeorm'

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const dbConfig = <ConnectionOptions>{
      type: 'postgres',
      host: config.get<string>('DB_HOST'),
      port: +config.get<string>('DB_PORT'),
      database: config.get<string>('DB_NAME'),
      username: config.get<string>('DB_USER'),
      password: config.get<string>('DB_PASSWORD'),
      autoLoadEntities: true,
      synchronize: true,
      logging: config.get<string>('DB_LOGGIN')
    }

    return dbConfig
  }
})
