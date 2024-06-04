import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString} from "@nestjs/class-validator";

export class CreateUserDto {
    @ApiProperty({description: 'Имя пользователя', example: 'Миша'})
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({description: 'Фамилия пользователя', example: 'Рыбак'})
    @IsString()
    @IsNotEmpty()
    readonly surname: string;

    @ApiProperty({description: 'Email пользователя', example: 'mishka@rambler.ru'})
    @IsEmail()
    readonly email: string;

    @ApiProperty({description: 'Пароль пользователя'})
    @IsNotEmpty()
    readonly password: string
}