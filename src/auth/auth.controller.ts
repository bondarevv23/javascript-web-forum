import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Res, UseFilters} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {UnauthorizedExceptionFilter} from "../filter/unauthorized.exception.filter";
import {UserCredentials} from "../users/dto/user-credentials";
import {UserResponseDto} from "../users/dto/user-response.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }


    @Post('/login')
    @ApiOperation({summary: 'Авторизоваться'})
    @ApiOkResponse({description: 'Пользователь успешо авторизирован'})
    @ApiBadRequestResponse({description: 'Неверная почта или пароль'})
    @UseFilters(new UnauthorizedExceptionFilter())
    async login(@Body() userCredentials: UserCredentials, @Res({passthrough: true}) res) {
        const token = await this.authService.signIn(userCredentials);
        res.cookie('accessToken', token.accessToken, {httpOnly: true});
        return token;
    }


    @Post('/logout')
    @ApiOperation({summary: 'Выйти'})
    @ApiOkResponse({description: 'Пользователь успешо разлогинен'})
    async logout(@Res({passthrough: true}) res) {
        console.log("start logout")
        res.clearCookie('accessToken');
        console.log("cookie removed");
    }


    @Post('/register')
    @ApiOkResponse({type: UserResponseDto})
    @ApiOperation({summary: 'Создать нового пользователя'})
    @ApiBadRequestResponse({description: 'Неверный запрос'})
    async create(@Body() createUserDto: CreateUserDto) {
        return this.authService.create(createUserDto);
    }
}