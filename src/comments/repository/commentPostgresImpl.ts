import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma.service";
import {CommentRepository} from "./comment.repo";
import {CreateCommentDto} from "../dto/create-comment.dto";

@Injectable()
export class CommentPostgresImpl implements CommentRepository {
    constructor(private readonly prismaService: PrismaService) {
    }

    async create(payload, comment: CreateCommentDto) {
        return this.prismaService.comment.create({
            data: {
                content: comment.text,
                author: {
                    connect: {
                        id: payload.sub
                    }
                },
                post: {
                    connect: {
                        id: Number.parseInt(comment.postId)
                    }
                }
            },
            include: {
                author: true
            }
        });
    }

    async deleteById(payload, id: number) {
        this.prismaService.comment.delete({
            where: {id: payload.sub}
        })
    }

    async getById(id: number) {
        return this.prismaService.comment.findUnique({
            where: {
                id: id
            },
            include: {
                author: true
            }
        });
    }

    async getByUserId(id: number) {
        return this.prismaService.comment.findMany({
            where: {
                authorId: id
            },
            include: {
                author: true
            }
        });
    }

    async getByPostId(id: number) {
        return this.prismaService.comment.findMany({
            where: {
                postId: id
            },
            include: {
                author: true
            }
        });
    }


}