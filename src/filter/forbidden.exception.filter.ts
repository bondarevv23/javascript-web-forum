import {ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, HttpStatus,} from '@nestjs/common';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {

    catch(exception: ForbiddenException, host: ArgumentsHost): void {
        console.log("catch forbidden")
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response
            .status(HttpStatus.FORBIDDEN)
            .json({
                message: exception.message
            });

    }
}