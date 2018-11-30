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
import { TableComponent } from './shared/table/table.component'
import { ReportComponent } from './page/report/report.component'
import { EstimationsTableComponent } from './shared/estimations-table/estimations-table.component'
import { FooterComponent } from './shared/footer/footer.component'

// my service
import { RecaptchaService } from './service/recaptcha/recaptcha.service'
import { ConfigService } from './service/config/config.service'
import { TokenInterceptorService } from './service/interceptor/token-interceptor.service'
import { ReportProviderService } from './service/report/report-provider.service'
import { UrlService } from './service/url/url.service'
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http)
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        ToolbarComponent,
        SearchComponent,
        TableComponent,
        ReportComponent,
        EstimationsTableComponent,
        FooterComponent,
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
