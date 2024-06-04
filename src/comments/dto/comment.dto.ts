import {ApiProperty} from "@nestjs/swagger";
import {UserResponseDto} from "../../users/dto/user-response.dto";
import {PostResponseDto} from "../../posts/dto/post-response.dto";
import {IsNotEmpty, IsString} from "@nestjs/class-validator";
import {text} from "express";

export class CommentDto {

    @ApiProperty(
        {description: 'id комментария'}
    )
    readonly commentId: number;

    @ApiProperty(
        {description: 'автор'}
    )
    readonly author: UserResponseDto;

    @ApiProperty({
        description: 'Пост'
    })
    readonly postId: number;

    @ApiProperty({
        description: 'Текст комментария',
        example: 'Хороший пост'
    })

    @IsString()
    @IsNotEmpty()
    readonly text: string;

    readonly creationDate: Date;


    constructor(commentId: number, author: UserResponseDto, postId: number, createdAt: Date, text: string) {
        this.commentId = commentId;
        this.author = author;
        this.postId = postId;
        this.creationDate = createdAt;
        this.text = text;
    }
}