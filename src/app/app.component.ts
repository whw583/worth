import { Component, Inject } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { DOCUMENT } from '@angular/common'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(
        private translate: TranslateService,
        @Inject(DOCUMENT) private document: Document
    ) {
          this.initTranslateService()
    }

    initTranslateService() {
        this.translate.setDefaultLang('en')
        const hostNamePrefix = this.document.location.hostname.split('.')[0]
        if (hostNamePrefix.length === 2) {
            this.translate.use(hostNamePrefix)
        }
    }
}
