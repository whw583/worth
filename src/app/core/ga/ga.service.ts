import { Inject, Injectable, isDevMode, PLATFORM_ID } from '@angular/core'
import { DOCUMENT, isPlatformBrowser } from '@angular/common'
import { NavigationEnd, Router } from '@angular/router'
import { filter, skip } from 'rxjs/operators'
import { src, innerHtml } from './ga-string'
declare const ga: Function

@Injectable({
    providedIn: 'root',
})
export class GaService {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Object,
        private router: Router
    ) {
        this.initial()
    }

    private initial() {
        if (isDevMode() || !isPlatformBrowser(this.platformId)) {
            return
        }

        this.addGaScripts()
        this.listenUrlChange()
    }

    private listenUrlChange() {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                skip(1)
            )
            .subscribe((event: NavigationEnd) => {
                if (typeof ga !== 'function') {
                    return
                }
                ga('set', 'page', event.urlAfterRedirects)
                ga('send', 'pageview')
            })
    }

    private addGaScripts() {
        try {
            const loadScript = this.document.createElement('script')

            loadScript.async = true
            loadScript.src = src

            const script = this.document.createElement('script')
            script.innerHTML = innerHtml
            // add to body
            this.document.body.append(loadScript)
            this.document.body.append(script)
        } catch (e) {
            console.log(e)
        }
    }
}
