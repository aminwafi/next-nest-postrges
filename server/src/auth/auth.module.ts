import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuardStrategy } from 'src/guards/jwt-auth/jwt-auth.strategy';
import { JwtGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { GoogleStrategy } from 'src/guards/google-oauth/google-oauth.strategy';
import { GoogleOauthGuard } from 'src/guards/google-oauth/google-oauth.guard';
import { configDotenv } from 'dotenv';

configDotenv();

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '3d',
        },
        global: true,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuardStrategy, JwtGuard, GoogleStrategy]
})
export class AuthModule {}
