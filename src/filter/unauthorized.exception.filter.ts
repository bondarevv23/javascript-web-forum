import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, UnauthorizedException,} from '@nestjs/common';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {

    catch(exception: UnauthorizedException, host: ArgumentsHost): void {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        response
            .status(HttpStatus.UNAUTHORIZED)
            .json({
                message: exception.message
            });

    }
}