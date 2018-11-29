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
        return from(this.recaptcha.getToken()).pipe(
            switchMap(token => {
                const clonedRequest = req.clone({
                    headers: req.headers
                        .set('recaptcha-token', token)
                        .set('recaptcha-action', 'homepage'),
                })
                console.log('new headers', clonedRequest.headers.keys())
                return next.handle(clonedRequest)
            })
        )
    }
}
