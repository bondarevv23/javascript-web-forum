import {ApiProperty} from "@nestjs/swagger";
import {IsEmail} from "@nestjs/class-validator";

export class UserCredentials {
    @ApiProperty({description: 'Email пользователя', example: 'mishka@rambler.ru'})
    @IsEmail()
    readonly email: string;

    @ApiProperty({description: 'Пароль пользователя'})
    readonly password: string


    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}