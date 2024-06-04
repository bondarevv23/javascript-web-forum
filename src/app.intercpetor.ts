import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";

@Injectable()
export class AppIntercpetor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const startTime = Date.now();
        return next.handle()
            .pipe(
                map((data) => ({...data, serverTime: Date.now() - startTime}))
            );
    }

}