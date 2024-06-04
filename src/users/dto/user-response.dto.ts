import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString} from "@nestjs/class-validator";

export class UserResponseDto {
    @ApiProperty({ description: 'Идентификатор пользователя', example: 1 })
    readonly id: number;

    @ApiProperty({description: 'Имя пользователя', example: 'Миша'})
    @IsString()
    readonly name: string;

    @ApiProperty({description: 'Фамилия пользователя', example: 'Рыбак'})
    @IsString()
    readonly surname: string;

    @ApiProperty({description: 'Email пользователя', example: 'mishka@rambler.ru'})
    @IsEmail()
    readonly email: string;

    constructor(id: number, name: string, surname: string, email: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
    }
}
