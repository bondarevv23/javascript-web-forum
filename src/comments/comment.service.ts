import {Inject, Injectable, NotImplementedException} from "@nestjs/common";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentDto} from "./dto/comment.dto";
import {UserResponseDto} from "../users/dto/user-response.dto";
import {DataSourceToken} from "./constants/comment.constants";
import {CommentRepository} from "./repository/comment.repo";

@Injectable()
export class CommentService {
    constructor(@Inject(DataSourceToken) private readonly commentRepo: CommentRepository) {
    }

    async create(payload, comment: CreateCommentDto): Promise<CommentDto> {
        console.log("create comment")
        console.log(payload)
        const commentDto = await this.commentRepo.create(payload, comment);
        return this.mapComment(commentDto);
    }

    async deleteById(payload, id: number) {
        await this.commentRepo.deleteById(payload, id);
    }

    async getById(id: number): Promise<CommentDto> {
        const commentDto = await this.commentRepo.getById(id);
        return this.mapComment(commentDto);
    }

    async getByUserId(id: number): Promise<CommentDto[]> {
        const commentDto = await this.commentRepo.getByUserId(id);
        console.log(commentDto)
        return commentDto.map(this.mapComment);
    }

    async getByPostId(id: number): Promise<CommentDto[]> {
        const commentDto = await this.commentRepo.getByPostId(id)
        return commentDto.map(this.mapComment);
    }

    mapComment(comment) {
        return new CommentDto(
            comment.id,
            new UserResponseDto(
                comment.author.id,
                comment.author.name,
                comment.author.surname,
                comment.author.email),
            comment.postId,
            comment.createdAt,
            comment.content
        )
    }
}