import {PostRepository} from "./post.repo";
import {ForbiddenException, Injectable} from "@nestjs/common";
import {PostRequestDto} from "../dto/post-request.dto";
import {PrismaService} from "../../prisma.service";

@Injectable()
export class PostPostgresImpl implements PostRepository {
    constructor(private readonly prismaService: PrismaService) {
    }

    async create(payload, postDto: PostRequestDto) {
        var createdPost;
        if (postDto.photosUrls) {
            createdPost = await this.prismaService.post.create({
                data: {
                    title: postDto.title,
                    subTitle: postDto.subTitle,
                    content: postDto.content,
                    tags: postDto.tags,
                    author: {
                        connect: {
                            id: payload.sub
                        }
                    },
                    images: {
                        create: {
                            url: postDto.photosUrls
                        }
                    }
                },
                include: {
                    author: true
                }
            });
        } else {
            createdPost = await this.prismaService.post.create({
                data: {
                    title: postDto.title,
                    subTitle: postDto.subTitle,
                    content: postDto.content,
                    tags: postDto.tags,
                    author: {
                        connect: {
                            id: payload.sub
                        }
                    }
                },
                include: {
                    author: true
                }
            });
        }
        return createdPost;
    }

    async deleteById(payload, id: number) {
        const post = await this.prismaService.post.findUnique({
            where: {id}
        });
        if (post.authorId !== payload.sub) {
            throw new ForbiddenException(`Post with id ${id} and authorId ${payload.sub} not found`);
        }
        await this.prismaService.image.deleteMany({
            where: {
                postId: id
            }
        })
        await this.prismaService.comment.deleteMany({
            where: {
                postId: id
            }
        })
        await this.prismaService.post.delete({
            where: {id}
        })
    }

    async findAll(limit: number, offset: number) {
        return this.prismaService.post.findMany({
            take: limit,
            skip: offset,
            include: {
                author: true,
                images: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async findByAuthorId(author_id: number, limit: number, offset: number) {
        return this.prismaService.post.findMany({
            where: {
                authorId: author_id
            },
            take: limit,
            skip: offset,
            include: {
                images: true
            }
        });
    }

    async findById(id: number) {
        return this.prismaService.post.findUnique(
            {
                where: {id},
                include: {
                    author: true,
                    images: true
                }
            }
        )
    }

}