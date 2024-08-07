import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configDotenv } from 'dotenv';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

configDotenv();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOSTNAME,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity.js"],
      synchronize: true
    }),
    ProductsModule,
    AuthModule,

    ThrottlerModule.forRoot([{
      // NOTE: Set default to 100 request per 60 sec
      ttl: parseInt(process.env.THROTTLE_TTL) ?? 60000,
      limit: parseInt(process.env.THROTTLE_LIMIT) ?? 100
    }]),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    AppService
  ],
})
export class AppModule {}
