import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { configDotenv } from 'dotenv';

configDotenv();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.NESTAUTH_SECRET,
      signOptions: { expiresIn: '1h' }
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
