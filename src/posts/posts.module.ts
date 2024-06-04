import {Module, Scope} from '@nestjs/common';
import {PostsService} from "./post.service";
import {PostsController} from "./post.controller";
import {PrismaService} from "../prisma.service";
import {UsersService} from "../users/user.service";
import {JwtService} from "@nestjs/jwt";
import {PostPostgresImpl} from "./repository/postPostgresImpl";
import {DataSourceToken} from "./constants/post.constants";
import {PostMockRepo} from "./repository/post.mockrepo";
import {PostFactory} from "./repository/post.factory";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [UsersModule],
    controllers: [PostsController],
    providers: [
        PostsService,
        PrismaService,
        UsersService,
        JwtService,
        {
            provide: DataSourceToken,
            scope: Scope.REQUEST,
            useFactory: (factory: PostFactory) => {
                return factory.create();
            },
            inject: [PostFactory],
        },
        PostPostgresImpl,
        PostMockRepo,
        PostFactory
    ]

})
export class PostsModule {
}
