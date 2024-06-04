import {Injectable} from "@nestjs/common";
import {PostRepository} from "./post.repo";
import {PostRequestDto} from "../dto/post-request.dto";


@Injectable()
export class PostMockRepo implements PostRepository {
    create(payload, postDto: PostRequestDto) {
        return allPosts[0];
    }

    deleteById(payload, id: number) {
        // do nothing
    }

    findAll(limit: number, offset: number) {
        return allPosts;
    }

    findByAuthorId(author_id: number, limit: number, offset: number) {
        return allPosts[0];
    }

    findById(id: number) {
        return allPosts[0]
    }

}

export const allPosts =
    [
        {
            id: 12,
            title: 'Чудо-рыба',
            subTitle: 'Рыбалка для начинающих: советы и рекомендации',
            content: 'Рыбалка - это увлекательное и расслабляющее хобби, но для новичков она может казаться сложной и запутанной. Вот несколько советов, которые помогут вам начать:\n' +
                '\n' +
                'Выбор снасти: Для начала выберите простую снасть. Удилище и катушка средней ценовой категории подойдут для большинства видов рыбы.\n' +
                '\n' +
                'Изучите место: Подготовьтесь заранее и изучите место для рыбалки. Узнайте, какие виды рыбы там водятся и какие приманки им нравятся.\n' +
                '\n' +
                'Практика ловли: Начните с основных методов ловли, таких как мормышка, блесна или живца. Постепенно улучшайте свои навыки.\n' +
                '\n',
            createdAt: '2024-04-13T11:39:04.533Z',
            authorId: 1,
            tags: ['Советы'],
            author: {
                id: 1,
                name: 'Миша',
                surname: 'Рыбец',
                email: 'mishlen9@rambler.ru',
                password: '123'
            },
            images: [],
            comments: []
        },
        {
            id: 21,
            title: 'привет всем любителям рыболовок',
            subTitle: 'ХАЛЛЛООУУ',
            content: 'Я ОЧЕНЬ ДОВОЛЬНЫЙ ЧТО АВГУСТОВСКИЙ СДЕЛАЛИ СНОВА А Я НЕ ДОВОЛЬНЫЙ ПРИВЕТ ВСЕМ Я АСЛАН \n' +
                '\n' +
                'ребята чаще смейтесь ахаххаха вот так',
            createdAt: '2024-04-20T00:55:03.091Z',
            authorId: 16,
            tags: ['позитив', 'ура', 'супер', 'хайп', 'вагон-хайпа'],
            author: {
                id: 16,
                name: 'Аслан',
                surname: 'Темирканов',
                email: 'aat0007@mail.ru',
                password: '12345'
            },
            images: [],
            comments: []
        },
        {
            id: 19,
            title: 'Пост',
            subTitle: 'Пост с тегами',
            content: 'В этом посте будут теги',
            createdAt: '2024-04-20T00:13:06.393Z',
            authorId: 15,
            tags: ['Тег', 'еще', 'один', 'тег'],
            author: {
                id: 15,
                name: 'Иван',
                surname: 'Петрович',
                email: 'pert@awe.wer',
                password: '123'
            },
            images: [],
            comments: []
        }
    ]
