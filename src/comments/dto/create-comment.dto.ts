import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "@nestjs/class-validator";
import {UserResponseDto} from "../../users/dto/user-response.dto";
import {PostResponseDto} from "../../posts/dto/post-response.dto";

export class CreateCommentDto{

    @ApiProperty(
        {description: 'id автора'}
    )
    readonly authorId: number;

    @ApiProperty({
        description: 'id поста'
    })

    readonly postId: string;

    @ApiProperty({
        description: 'Текст комментария',
        example: 'Хороший пост'
    })

    @IsString()
    @IsNotEmpty()
    readonly text: string;
}