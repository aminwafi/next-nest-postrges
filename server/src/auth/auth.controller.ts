import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from 'src/guards/google-oauth/google-oauth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        // initiates the Google OAuth2 login flow
    }

    @Get('google/callback')
    @UseGuards(GoogleOauthGuard)
    async googleAuthCallback(@Req() req, @Res() res: any) {
        try {
            const token = await this.authService.oAuthLogin(req.user);
            res.redirect(`http://localhost:3000/oauth?token=${token.jwt}`);
        } catch (err) {
            res.status(500).send({ success: false, message: err.message })
        }
    }
}