import {CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private configService: ConfigService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("AuthGuard")
        const request = context.switchToHttp().getRequest();
        // const token = this.extractTokenFromHeader(request);
        const token = this.extractTokenFromCookie(request);
        console.log(token)
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    ignoreExpiration: true,
                    secret: this.configService.get<string>('JWT_SECRET')
                }
            );
            console.log(payload);
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        console.log("extractTokenFromHeader", request, "finishHeader");
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private extractTokenFromCookie(request: Request): string | undefined {
        return request.cookies['accessToken'];
    }
}
