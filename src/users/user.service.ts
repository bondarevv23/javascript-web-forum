import {Inject, Injectable, NotFoundException, NotImplementedException, UnauthorizedException} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserResponseDto} from "./dto/user-response.dto";
import {UserCredentials} from "./dto/user-credentials";
import {Prisma} from "@prisma/client";
import {UserMapper} from "./mapper/user-mapper";
import {UserRepository} from "./repository/user.repository";
import {DataSourceToken} from "./constants/user.constants";

@Injectable()
export class UsersService {
    constructor(@Inject(DataSourceToken) private readonly userRepository: UserRepository) {
    }

    async findById(id: number): Promise<UserResponseDto> {
        const user = await this.userRepository.findById(id);
        console.log(user)
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return UserMapper.toUser(user);
    }

    async create(data: Prisma.UserCreateInput): Promise<UserResponseDto> {
        const prismaUserClient = await this.userRepository.create(data)
        return UserMapper.toUser(prismaUserClient);

    }

    async login(userCredentials: UserCredentials) {
        console.log(userCredentials)
        const user = await this.userRepository.login(userCredentials);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return UserMapper.toUser(user);
    }

    async update(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const user = await this.userRepository.update(createUserDto);
        if (!user) {
            throw new NotFoundException(`User with id ${createUserDto.email} not found`);
        }
        return UserMapper.toUser(user);
    }

    logout(): Promise<UserResponseDto> {
        throw new NotImplementedException();
    }
}