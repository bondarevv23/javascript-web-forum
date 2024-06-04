import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus,} from '@nestjs/common';
import e from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

    catch(exception: unknown, host: ArgumentsHost): void {
        console.log("exception" + exception.toString());
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        response
            .status(httpStatus)
            .json({
                message: "Internal server error",
            });

    }
}