import { NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { RecaptchaService } from './recaptcha/recaptcha.service'
import { UrlService } from './url/url.service'
import { ConfigService } from './config/config.service'
import { TokenInterceptorService } from './interceptor/token-interceptor.service'
import { ReportProviderService } from './report/report-provider.service'


@NgModule({
    declarations: [],
    imports: [HttpClientModule , ],
    providers: [
        RecaptchaService,
        ConfigService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
        ReportProviderService,
        UrlService,
    ],
})
export class CoreModule {}
