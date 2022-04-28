import { DynamicModule } from '@nestjs/common'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

export const JwtProvider: DynamicModule = JwtModule.registerAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    return <JwtModuleOptions>{
      secret: config.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: config.get<string>('JWT_EXPIRES') }
    }
  }
})
