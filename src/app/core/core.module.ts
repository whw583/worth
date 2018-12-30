import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { RecaptchaService } from './recaptcha/recaptcha.service'
import { UrlService } from './url/url.service'
import { ConfigService } from './config/config.service'
import { TokenInterceptor } from './interceptor/token-interceptor.service'
import { ServerAbsoluteUrlInterceptor } from './interceptor/server-absolute-url.service'
import { ReportProviderService } from './report/report-provider.service'
// just import
import { TranslateModuleForRoot } from './ngx-translate'

// ga
import { GaService } from './ga/ga.service'

@NgModule({
    declarations: [],
    imports: [HttpClientModule, TranslateModuleForRoot],
    providers: [
        RecaptchaService,
        ConfigService,
        TokenInterceptor,
        ServerAbsoluteUrlInterceptor,
        ReportProviderService,
        UrlService,

        GaService,
    ],
})
export class CoreModule {}
