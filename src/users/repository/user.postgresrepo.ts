import {UserRepository} from "./user.repository";
import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma.service";
import {Prisma} from "@prisma/client";
import {UserCredentials} from "../dto/user-credentials";
import {CreateUserDto} from "../dto/create-user.dto";

@Injectable()
export class UserPostgresrepo implements UserRepository {
    constructor(private readonly prismaService: PrismaService) {
    }

    async create(data) {
        return this.prismaService.user.create({
                data,
            }
        );
    }

    async findById(id: number) {
        return this.prismaService.user.findUnique({
            where: {id},
        });
    }

    async login(userCredentials: UserCredentials) {
        return this.prismaService.user.findUnique({
            where: {email: userCredentials.email, password: userCredentials.password},
        });
    }

    async update(createUserDto: CreateUserDto) {
        return this.prismaService.user.update({
            where: {email: createUserDto.email},
            data: createUserDto,
        });
    }


}