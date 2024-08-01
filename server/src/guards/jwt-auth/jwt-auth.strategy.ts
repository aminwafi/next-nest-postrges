import { ExecutionContext, Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";
import { configDotenv } from 'dotenv';

configDotenv();

@Injectable()
export class JwtGuardStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: any) {
        console.log('payload' , payload);
        return payload;
    }
}