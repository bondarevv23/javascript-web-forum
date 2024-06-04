import {CreateCommentDto} from "../dto/create-comment.dto";

export interface CommentRepository {
    create(payload, comment: CreateCommentDto);
    deleteById(payload, id: number);
    getById(id: number);
    getByUserId(id: number);
    getByPostId(id: number);
}
