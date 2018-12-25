import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import { from, Observable } from 'rxjs'
import { isPlatformServer, isPlatformBrowser } from '@angular/common'

@Injectable({
    providedIn: 'root',
})
export class ServerAbsoluteUrlService implements HttpInterceptor {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let url = req.url
        // ./assets/en.json
        if (url.startsWith('.')) {
            url = url.substring(1)
        }
        const isRelativePath = url.startsWith('/')

        const isServer = isPlatformServer(this.platformId)

        if (isRelativePath && isServer) {
            const serverHost = 'http://localhost:3000'
            const absolutePathUrl = serverHost + url

            const reqWithAbsolutePath = req.clone({
                url: absolutePathUrl,
            })

            return next.handle(reqWithAbsolutePath)
        }
        // do nothing
        return next.handle(req)
    }
}

export const ServerAbsoluteUrlInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: ServerAbsoluteUrlService,
    multi: true,
}
