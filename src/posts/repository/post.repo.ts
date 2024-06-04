import {PostResponseDto} from "../dto/post-response.dto";
import {PostRequestDto} from "../dto/post-request.dto";

export interface PostRepository {
    create(payload, postDto: PostRequestDto);

    deleteById(payload, id: number);

    findAll(limit: number, offset: number);

    findByAuthorId(author_id: number,
                   limit: number,
                   offset: number);

    findById(id: number);
}
