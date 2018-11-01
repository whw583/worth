import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { HttpClientModule, HttpClient } from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './page/home/home.component'
import { AboutComponent } from './page/about/about.component'
import { NavComponent } from './shared/nav/nav.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './module/material/material.module'
import { ToolbarComponent } from './shared/toolbar/toolbar.component'

import { FlexLayoutModule } from '@angular/flex-layout'
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http)
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        NavComponent,
        ToolbarComponent,
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
        FlexLayoutModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
