import {Injectable} from "@nestjs/common";
import {CommentRepository} from "./comment.repo";
import {CreateCommentDto} from "../dto/create-comment.dto";


@Injectable()
export class CommentMockrepo implements CommentRepository {
    create(payload, comment: CreateCommentDto) {
        return allPost[0];
    }

    deleteById(payload, id: number) {
        // do nothing
    }

    getById(id: number) {
        return allPost[1]
    }

    getByPostId(id: number) {
        return allPost
    }

    getByUserId(id: number) {
        return allPost
    }

}

export const allPost = [

    {
        id: 16,
        content: 'Я вас услышал😅 \n\ncпасибо за отзыв 🤓👍',
        createdAt: '2024-04-20T05:41:58.324Z',
        authorId: 13,
        postId: 22,
        author: {
            id: 13,
            name: 'Саша',
            surname: 'Горюнов',
            email: 'sasha.g27204@gmail.co',
            password: '12345'
        }
    },
    {
        id: 26,
        content: 'вот это Пост😍😜🤪!!\nпросто пушка-бомба💣 побольше бы таких добрых людей',
        createdAt: '2024-04-20T09:48:49.605Z',
        authorId: 13,
        postId: 23,
        author: {
            id: 13,
            name: 'Саша',
            surname: 'Горюнов',
            email: 'sasha.g27204@gmail.co',
            password: '12345'
        }
    }
]
