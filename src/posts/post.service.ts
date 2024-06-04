import {
    ForbiddenException, Inject,
    Injectable,
    NotFoundException,
    NotImplementedException,
    UnauthorizedException
} from '@nestjs/common';
import {PostRequestDto} from "./dto/post-request.dto";
import {PostResponseDto} from "./dto/post-response.dto";
import {PrismaService} from "../prisma.service";
import {UsersService} from "../users/user.service";
import {UserResponseDto} from "../users/dto/user-response.dto";
import {PostRepository} from "./repository/post.repo";
import {DataSourceToken} from "./constants/post.constants";

@Injectable()
export class PostsService {
    constructor(@Inject(DataSourceToken) private readonly postRepository: PostRepository,
                private readonly usersService: UsersService) {
    }

    async findByAuthorId(author_id: number, limit: number, offset: number): Promise<PostResponseDto[]> {
        const posts = await this.postRepository.findByAuthorId(author_id, limit, offset)
        if (!posts) {
            throw new UnauthorizedException('No posts found');
        }
        const user = await this.usersService.findById(author_id);
        return posts.map(post => this.mapToPostResponse(post, user));
    }

    async findById(id: number): Promise<PostResponseDto> {
        const post = await this.postRepository.findById(id);
        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        return this.mapToPostResponseAllFields(post);
    }


    async create(payload, postDto: PostRequestDto): Promise<PostResponseDto> {
        var createdPost = await this.postRepository.create(payload, postDto);

        return this.mapToPostResponseAllFields(createdPost)
    }

    async findAll(limit: number, offset: number): Promise<PostResponseDto[]> {
        const posts = await this.postRepository.findAll(limit, offset);
        console.log(posts)
        if (!posts) {
            throw new UnauthorizedException('No posts found');
        }
        // return null;
        return posts.map(post => this.mapToPostResponseAllFields(post));
    }

    async deleteById(payload, id: number) {
        console.log("delete " + id)
        this.postRepository.deleteById(payload, id);
    }

    mapToPostResponse(post, user: UserResponseDto): PostResponseDto {
        return new PostResponseDto(
            post.id,
            post.title,
            post.subTitle,
            post.content,
            user,
            post.createdAt,
            post.tags,
            post.images
        )
    }

    mapToPostResponseAllFields(post): PostResponseDto {
        return new PostResponseDto(
            post.id,
            post.title,
            post.subTitle,
            post.content,
            new UserResponseDto(
                post.author.id,
                post.author.name,
                post.author.surname,
                post.author.email,
            ),
            post.createdAt,
            post.tags,
            post.images
        )
    }

}