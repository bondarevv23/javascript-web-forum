import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from "./auth.controller";
import {AuthGuard} from "./auth.guard";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        ConfigModule,
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: process.env.JWT_SECRET ,
                signOptions: { expiresIn: '60s' },
            }),
        }),
    ],
    providers: [AuthService,
        AuthGuard
        // {
        //     provide: APP_GUARD,
        //     useClass: AuthGuard,
        // }
    ],
    controllers: [AuthController],
})
export class AuthModule {
}
