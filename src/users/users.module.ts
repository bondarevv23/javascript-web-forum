import {Module, Scope} from '@nestjs/common';
import {UserController} from "./users.controller";
import {UsersService} from "./user.service";
import {PrismaService} from "../prisma.service";
import {JwtService} from "@nestjs/jwt";
import {DataSourceToken} from "./constants/user.constants";
import {UserPostgresrepo} from "./repository/user.postgresrepo";
import {UserFactory} from "./repository/user.factory";
import {UserMockrepo} from "./repository/user.mockrepo";

@Module({
    controllers: [UserController],
    providers: [
        UsersService,
        PrismaService,
        JwtService,
        {
            provide: DataSourceToken,
            scope: Scope.REQUEST,
            useFactory: (factory: UserFactory) => {
                return factory.create();
            },
            inject: [UserFactory],
        },
        UserFactory,
        UserMockrepo,
        UserPostgresrepo
    ],
    exports: [UsersService, DataSourceToken],

})
export class UsersModule {}
