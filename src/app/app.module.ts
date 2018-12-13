import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {
    HttpClientModule,
    HttpClient,
    HTTP_INTERCEPTORS,
} from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './page/home/home.component'
import { AboutComponent } from './page/about/about.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './module/material/material.module'
import { ToolbarComponent } from './shared/toolbar/toolbar.component'

import { FlexLayoutModule } from '@angular/flex-layout'
import { SearchComponent } from './shared/search/search.component'
import { ReportComponent } from './page/report/report.component'
import { FooterComponent } from './shared/footer/footer.component'

// my service
import { RecaptchaService } from './service/recaptcha/recaptcha.service'
import { ConfigService } from './service/config/config.service'
import { TokenInterceptorService } from './service/interceptor/token-interceptor.service'
import { ReportProviderService } from './service/report/report-provider.service'
import { UrlService } from './service/url/url.service'
import { DataGridComponent } from './shared/data-grid/data-grid.component'
import { ReportExplainComponent } from './shared/report-explain/report-explain.component'
import { ReportAlexaRankComponent } from './shared/report-alexa-rank/report-alexa-rank.component'
import { ReportAdRevenueComponent } from './shared/report-ad-revenue/report-ad-revenue.component'
import { ReportRankByCountryComponent } from './shared/report-rank-by-country/report-rank-by-country.component'
import { ReportContributingSubdomainsComponent } from './shared/report-contributing-subdomains/report-contributing-subdomains.component'
import { LocalNumberPipe } from './pipe/local-number/local-number.pipe'
import { PrettyNumberPipe } from './pipe/pretty-number/pretty-number.pipe';
import { CodeToCountryPipe } from './pipe/code-to-country/code-to-country.pipe';
import { TopListComponent } from './shared/top-list/top-list.component';
import { ReportUpdaterComponent } from './shared/report-updater/report-updater.component';
import { TimestampToDatePipe } from './pipe/timestamp-to-date/timestamp-to-date.pipe';
import { ClientNowPipe } from './pipe/client-now/client-now.pipe'

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http)
}

//

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        ToolbarComponent,
        SearchComponent,
        ReportComponent,
        FooterComponent,
        DataGridComponent,
        ReportExplainComponent,
        ReportAlexaRankComponent,
        ReportAdRevenueComponent,
        ReportRankByCountryComponent,
        ReportContributingSubdomainsComponent,
        LocalNumberPipe,
        PrettyNumberPipe,
        CodeToCountryPipe,
        TopListComponent,
        ReportUpdaterComponent,
        TimestampToDatePipe,
        ClientNowPipe,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
    ],
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
    bootstrap: [AppComponent],
})
export class AppModule {}
