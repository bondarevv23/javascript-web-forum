import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString} from "@nestjs/class-validator";
import {PostTag} from "../enum/post-tag";

export class PostRequestDto {

    @ApiProperty({description: 'Заголовок поста', example: 'Чудо-рыба'})
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    @ApiProperty({description: 'Подаголовок поста', example: 'Чудо-рыба: секрет успешной рыбалки'})
    @IsString()
    @IsNotEmpty()
    readonly subTitle: string;

    @IsNumber()
    readonly authorId: number;

    @ApiProperty({
        description: 'Содержимое поста',
        example: 'Рыбалка - это увлекательное и расслабляющее хобби, но для новичков она может казаться сложной и запутанной. Вот несколько советов, которые помогут вам начать:\n' +
            '\n' +
            'Выбор снасти: Для начала выберите простую снасть. Удилище и катушка средней ценовой категории подойдут для большинства видов рыбы.\n' +
            '\n' +
            'Изучите место: Подготовьтесь заранее и изучите место для рыбалки. Узнайте, какие виды рыбы там водятся и какие приманки им нравятся.\n' +
            '\n' +
            'Практика ловли: Начните с основных методов ловли, таких как мормышка, блесна или живца. Постепенно улучшайте свои навыки.\n' +
            '\n'
    })
    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @ApiProperty({
        description: 'Список ссылок на картинки к посту',
        example: 'https://fishka.onrender.com/assets/img/pelengas.png'
    })
    @IsOptional()
    readonly photosUrls: string

    @ApiProperty({ description: 'Теги поста', enum: PostTag})
    @IsArray()
    @IsOptional()
    readonly tags: string[];
}