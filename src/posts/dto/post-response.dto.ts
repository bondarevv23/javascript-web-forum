import {ApiProperty} from '@nestjs/swagger';
import {UserResponseDto} from "../../users/dto/user-response.dto";
import {PostTag} from "../enum/post-tag";
import {IsNotEmpty, IsString} from "@nestjs/class-validator";

export class PostResponseDto {
    @ApiProperty({description: 'Идентификатор поста', example: 1})
    readonly id: number;

    @ApiProperty({description: 'Заголовок поста', example: 'Чудо-рыба'})
    readonly title: string;

    @ApiProperty({description: 'Подзаголовок поста', example: 'Чудо-рыба: секрет успешной рыбалки'})
    readonly subTitle: string;

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
    readonly content: string;

    @ApiProperty({description: 'Автор поста', type: () => UserResponseDto})
    readonly author: UserResponseDto;

    @ApiProperty({description: 'Дата создания поста', example: '2024-03-23T12:34:56.789Z'})
    readonly creationDate: Date;

    @ApiProperty({
        description: 'Список ссылок на картинки к посту',
        example: 'https://fishka.onrender.com/assets/img/pelengas.png'
    })
    @IsString()
    @IsNotEmpty()
    readonly photosUrls: string[]

    @ApiProperty({ description: 'Теги поста', enum: PostTag })
    readonly tags: string[];

    @ApiProperty({description: 'id топика'})
    readonly topicId: number;


    constructor(id: number, title: string, subTitle: string, content: string, author: UserResponseDto, creationDate: Date, tags: string[], photosUrls: string[]) {
        this.id = id;
        this.title = title;
        this.subTitle = subTitle;
        this.content = content;
        this.author = author;
        this.creationDate = creationDate;
        this.tags = tags;
        this.photosUrls = photosUrls;
    }
}
