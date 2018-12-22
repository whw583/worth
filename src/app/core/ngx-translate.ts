import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'

export function createMyTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

const TranslateModuleForRoot = TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: createMyTranslateLoader,
        deps: [HttpClient],
    },
})

export { TranslateModuleForRoot }
