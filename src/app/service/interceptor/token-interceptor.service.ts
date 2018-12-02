import { Injectable } from '@angular/core'
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import { Observable, from } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { RecaptchaService } from '../recaptcha/recaptcha.service'

@Injectable({
    providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private recaptcha: RecaptchaService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        console.log(req.url)
        const isProtected = req.url.startsWith('/api/protected/')
        if (!isProtected) {
            return next.handle(req)
        }

        return from(this.recaptcha.getToken()).pipe(
            switchMap(token => {
                const reqWithToken = req.clone({
                    headers: req.headers
                        .set('recaptcha-token', token)
                        .set('recaptcha-action', 'homepage'),
                })
                return next.handle(reqWithToken)
            })
        )
    }
}