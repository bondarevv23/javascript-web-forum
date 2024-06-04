import {Module, Scope} from '@nestjs/common';
import {CommentController} from "./comments.controller";
import {CommentService} from "./comment.service";
import {PrismaService} from "../prisma.service";
import {JwtService} from "@nestjs/jwt";
import {CommentFactory} from "./repository/comment.factory";
import {DataSourceToken} from "./constants/comment.constants";
import {CommentMockrepo} from "./repository/comment.mockrepo";
import {CommentPostgresImpl} from "./repository/commentPostgresImpl";

@Module({
    controllers: [CommentController],
    providers: [
        CommentService,
        PrismaService,
        JwtService,
        {
            provide: DataSourceToken,
            scope: Scope.REQUEST,
            useFactory: (factory: CommentFactory) => {
                return factory.create();
            },
            inject: [CommentFactory],
        },
        CommentFactory,
        CommentMockrepo,
        CommentPostgresImpl
    ]
})
export class CommentsModule {
}
