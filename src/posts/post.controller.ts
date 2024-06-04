import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    Req,
    UseGuards
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {PostRequestDto} from './dto/post-request.dto';
import {PostsService} from "./post.service";
import {PostResponseDto} from "./dto/post-response.dto";
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }

    @Get()
    @ApiOperation({summary: 'Получить список все постов'})
    @ApiResponse({status: 200, description: 'Успешно получены статьи', type: [PostResponseDto]})
    @ApiResponse({status: 404, description: 'У автора не найдены статьи'})
    @ApiQuery({required: false, name: "limit"})
    @ApiQuery({required: false, name: "offset"})
    findAll(@Query("limit", new DefaultValuePipe(50), ParseIntPipe) limit: number,
            @Query("offset", new DefaultValuePipe(0), ParseIntPipe) offset: number): Promise<PostResponseDto[]> {

        return this.postsService.findAll(limit, offset);
    }

    @Get('/author/:user_id')
    @ApiOperation({summary: 'Получить список статьей по автору'})
    @ApiResponse({
        status: 200,
        description: 'Успешно получены статьи по автору',
        type: [PostResponseDto],
        isArray: true
    })
    @ApiResponse({status: 404, description: 'У автора не найдены статьи'})
    @ApiQuery({required: false, name: "limit"})
    @ApiQuery({required: false, name: "offset"})
    @ApiParam({name: "user_id", description: "id пользователя"})
    findByAuthorId(@Param("user_id") user_id: number,
                   @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
                   @Query("offset", new DefaultValuePipe(0), ParseIntPipe) offset: number): Promise<PostResponseDto[]> {
        console.log(limit, offset)
        return this.postsService.findByAuthorId(user_id, limit, offset);
    }

    @Get('/post/:id')
    @ApiOperation({summary: 'Получить статью по ID'})
    @ApiNotFoundResponse({description: 'Статья не найдена'})
    @ApiParam({name: "id", description: "id статьи"})
    findById(@Param('id') id: number): Promise<PostResponseDto> {
        return this.postsService.findById(id);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    @Post()
    @ApiOperation({summary: 'Создать новую статью'})
    @ApiCreatedResponse({description: 'Пост создан'})
    @ApiBadRequestResponse({description: 'Неверный запрос'})
    @ApiUnauthorizedResponse({description: 'Пользователь не авторизировани'})
    create(@Req() request: Request, @Body() postDto: PostRequestDto): Promise<PostResponseDto> {
        console.log(postDto)
        return this.postsService.create(request['user'], postDto);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    @Delete(':id')
    @ApiOperation({summary: 'Удалить пост'})
    @ApiOkResponse({description: 'Пост успешно удален'})
    @ApiUnauthorizedResponse({description: 'Пользователь не авторизировани'})
    @ApiParam({name: "id", description: "id поста"})
    async deleteById(@Req() request: Request, @Param('id') id) {

        await this.postsService.deleteById(request['user'], Number.parseInt(id));
    }

}
