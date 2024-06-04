import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UnauthorizedException,
    UseFilters,
    UseGuards
} from "@nestjs/common";
import {UserResponseDto} from "./dto/user-response.dto";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./user.service";
import {UserCredentials} from "./dto/user-credentials";
import {UnauthorizedExceptionFilter} from "../filter/unauthorized.exception.filter";
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Получить пользователя по ID' })
    @ApiOkResponse({ type: [UserResponseDto]})
    @ApiNotFoundResponse({ description: 'Пользователь не найден' })
    @ApiParam({  name: "id" , description :"id пользователя"})
    async findById(@Param('id') id: string): Promise<UserResponseDto> {
        return  this.usersService.findById(Number.parseInt(id));
    }


    @Patch('/update')
    @ApiOperation({summary: 'Редактировать пользователя'})
    @ApiOkResponse({description: 'Пользователь успешо обновлен'})
    @ApiUnauthorizedResponse({description: 'Пользователь не авторизировани'})
    async update(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return  this.usersService.update(createUserDto);
    }
}