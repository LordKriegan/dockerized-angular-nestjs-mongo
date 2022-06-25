import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/task.entity';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configValidationSchema } from './config.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const envFile = `.env.${process.env.STAGE}`

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static')
    }),
    ConfigModule.forRoot({
      envFilePath: [envFile],
      isGlobal: true,
      validationSchema: configValidationSchema
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('DB_URL'),
        synchronize: true,
        useUnifiedTopology: true,
        entities: [Task]
      })
    }),
    TaskModule
  ]
})
export class AppModule {}
