import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as process from "process";
import {join} from 'path';
import {NestExpressApplication} from "@nestjs/platform-express";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";
import {AllExceptionsFilter} from "./filter/all.exception.filter";
import {UnauthorizedExceptionFilter} from "./filter/unauthorized.exception.filter";
import {WsAdapter} from "@nestjs/platform-ws";
import {ForbiddenExceptionFilter} from "./filter/forbidden.exception.filter";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
    );

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('pug');

    const config = new DocumentBuilder()
        .setTitle('Рыбач')
        .setDescription('Рыбач API')
        .setVersion('3.0')
        .addBearerAuth({
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT-auth')
        .addTag('posts')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe({transform: true}))
    app.useGlobalFilters(new AllExceptionsFilter())
    app.useGlobalFilters(new UnauthorizedExceptionFilter())
    app.useGlobalFilters(new ForbiddenExceptionFilter())
    app.use(cookieParser());
    await app.listen(process.env.PORT);
}

bootstrap();
