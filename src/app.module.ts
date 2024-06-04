import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigModule} from "@nestjs/config";
import {PostsModule} from './posts/posts.module';
import {UsersModule} from './users/users.module';
import {CommentsModule} from './comments/comments.module';
import {join} from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
import {GatewayModule} from "./gateway/gateway.module";
import {AuthModule} from './auth/auth.module';
import {JwtService} from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true,}),
        PostsModule,
        UsersModule,
        CommentsModule,
        GatewayModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
            renderPath: '/',
        }),
        AuthModule],
    controllers: [AppController],
    providers: [JwtService]
})
export class AppModule {

}
