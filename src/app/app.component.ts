import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private translate: TranslateService) {
        translate.setDefaultLang('en')
        this.useTranslate()
    }

    useTranslate() {
        const { host, hostname } = window.location
        let lang = 'en'
        const hostNameArr = hostname.split('.')

        // test localhost first only for dev
        if (hostNameArr[hostNameArr.length - 1] === 'localhost') {
            if (hostNameArr.length >= 2) {
                lang = hostNameArr[0]
            }
        } else {
            if (hostNameArr.length >= 3) {
                lang = hostNameArr[0]
            }
        }

        this.translate.use(lang)
    }
}
