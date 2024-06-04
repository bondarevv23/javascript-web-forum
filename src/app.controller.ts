import {Controller, Get, Param, Query, Render, Req, UseGuards, UseInterceptors} from '@nestjs/common';
import {User} from "./model/user";
import {AppIntercpetor} from "./app.intercpetor";
import {AuthGuard} from "./auth/auth.guard";

@Controller()
@UseInterceptors(AppIntercpetor)
export class AppController {

    user: User = new User("Санёк", "");

    @Get(["/index", ""])
    @Render("content/index")
    public index(@Query('auth') auth: string) {
        return this.getUser(auth)
    }

    @Get("/articles")
    @Render("content/articles")
    public articles(@Query('auth') auth: string) {
        return this.getUser(auth)
    }


    @Get("/fish-places")
    @Render("content/fish-places")
    public async fishPlaces(@Query('auth') auth: string) {
        await new Promise(f => setTimeout(f, 2000));
        return this.getUser(auth)
    }

    @UseGuards(AuthGuard)
    @Get("/table-page")
    @Render("content/table-page")
    public tablePage(@Req() request: Request, @Query('auth') auth: string) {
        console.log(request)
        return this.getUser(auth)
    }


    @Get("/user-page/:id")
    @Render("content/user-page")
    public userPage(@Param('id') userId: string) {
        return {
            userId: userId,
            user: this.user
        }
    }

    @Get("/post-page/:id")
    @Render("content/post-page")
    public postPage(@Param('id') postId: string) {
        return {
            postId: postId,
            user: this.user
        }
    }

    @Get("/login")
    @Render("content/login-page")
    public loginPage() {
        return {
            user: this.user
        }
    }

    @Get("/register")
    @Render("content/register-page")
    public registerPage() {
        return {
            user: this.user
        }
    }

    @Get("/logout")
    @Render("content/index")
    public logoutPage() {
        return {
            user: null
        }
    }


    private getUser(auth: string) {
        if (auth === "true") {
            return {user: this.user};
        } else {
            return null;
        }
    }
}
