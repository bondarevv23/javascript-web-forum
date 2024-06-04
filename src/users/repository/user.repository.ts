import {CreateUserDto} from "../dto/create-user.dto";
import {UserCredentials} from "../dto/user-credentials";
import {Prisma} from "@prisma/client";

export interface UserRepository {
    findById(id: number);
    create(data);
    login(userCredentials: UserCredentials);
    update(createUserDto: CreateUserDto);
}