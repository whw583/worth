import { Component, Inject } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { DOCUMENT } from '@angular/common'
import * as moment from 'moment'
import 'moment/min/locales'

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
        this.initialMomentLang()
    }

    initTranslateService() {
        this.translate.setDefaultLang('en')
        const hostNamePrefix = this.document.location.hostname.split('.')[0]
        if (hostNamePrefix.length === 2) {
            this.translate.use(hostNamePrefix)
        }
    }

    private initialMomentLang() {
        const hostName = this.document.location.hostname
        if (hostName.startsWith('cn.')) {
            // cn
            moment.locale('zh-cn')
        } else if (hostName.startsWith('tw.')) {
            // tw
            moment.locale('zh-tw')
        } else if (hostName.startsWith('hk.')) {
            // hk
            moment.locale('zh-hk')
        } else {
            // default
            moment.locale('en-us')
        }
    }
}
