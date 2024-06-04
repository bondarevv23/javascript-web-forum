import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/user.service";
import {UserCredentials} from "../users/dto/user-credentials";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }

    async signIn(userCredentials: UserCredentials) {

        const user = await this.usersService.login(userCredentials);

        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
        };
        const accessToken = await this.jwtService.sign(payload);
        console.log(accessToken)
        return {
            accessToken,
            user: user
        };

    }

    async create(createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        console.log(user)
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
        };
        const accessToken = await this.jwtService.sign(payload);
        console.log(accessToken)
        return {
            accessToken,
            user: user
        };
    }
}