import {UserRepository} from "./user.repository";
import {Injectable} from "@nestjs/common";
import {Prisma} from "@prisma/client";
import {UserCredentials} from "../dto/user-credentials";
import {CreateUserDto} from "../dto/create-user.dto";

@Injectable()
export class UserMockrepo implements UserRepository {
    findById(id: number) {
        return allUsers[1]
    }

    create(data) {
        return allUsers[0]
    }

    login(userCredentials: UserCredentials) {
        return allUsers[1]
    }

    update(createUserDto: CreateUserDto) {
        return allUsers[1];
    }

}

export const allUsers = [
    {
        id: 4,
        name: 'Миша',
        surname: 'Рыбец',
        email: 'mishln@rambler.ru',
        password: '123'
    },
    {
        id: 5,
        name: 'Саша',
        surname: 'Рыбник',
        email: 'sasha.g27204@gmail.com',
        password: '123qwe'
    }
]