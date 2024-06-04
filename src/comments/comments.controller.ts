import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiCreatedResponse, ApiOkResponse,
    ApiOperation, ApiParam,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {Body, Controller, Delete, ForbiddenException, Get, Param, Post, Req, UseGuards} from "@nestjs/common";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentService} from "./comment.service";
import {CommentDto} from "./dto/comment.dto";
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('comments')
@Controller('comments')
export class CommentController {
    constructor(private readonly commentsService: CommentService) {
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    @Post()
    @ApiOperation({summary: 'Создать комментарий'})
    @ApiCreatedResponse({description: 'Комментарий создан'})
    @ApiBadRequestResponse({description: 'Неверный запрос'})
    @ApiUnauthorizedResponse({description: 'Пользователь не авторизировани'})
    async createComment(@Req() request: Request, @Body() comment: CreateCommentDto): Promise<CommentDto> {
        console.log(comment.postId + "  " + comment.authorId)
        return this.commentsService.create(request['user'], comment);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    @Delete(":id")
    @ApiOperation({summary: 'Удалить комментарий'})
    @ApiOkResponse({description: 'комменатрий удален'})
    @ApiUnauthorizedResponse({description: 'Пользователь не авторизировани'})
    @ApiParam({name: "id", description: "id комментария"})
    async deleteCommentByUd(@Req() request: Request, @Param() id: number) {

        this.commentsService.deleteById(request['user'], id);
    }

    @Get(':id')
    @ApiOperation({summary: 'Получить комментарий по id'})
    @ApiOkResponse({description: 'Комметнрий получен'})
    @ApiParam({name: "id", description: "id комментария"})
    async getCommentById(@Param("id") id: number): Promise<CommentDto> {
        console.log(id)
        return this.commentsService.getById(id);
    }

    @Get('/user/:id')
    @ApiOperation({summary: 'Получить комментарий по пользователю'})
    @ApiOkResponse({description: 'Комметнрии получены', type: CommentDto, isArray: true})
    @ApiParam({name: "id", description: "id пользователя"})
    async getCommentsByAuthor(@Param("id") id: number): Promise<CommentDto[]> {
        return this.commentsService.getByUserId(id);
    }

    @Get('/post/:id')
    @ApiOperation({summary: 'Получить комментарий по постам'})
    @ApiOkResponse({description: 'Комметнрии получены', type: CommentDto, isArray: true})
    @ApiParam({name: "id", description: "id поста"})
    async getCommentsByPost(@Param("id") id: number): Promise<CommentDto[]> {
        return this.commentsService.getByPostId(id);
    }
}