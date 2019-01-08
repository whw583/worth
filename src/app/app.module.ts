import {
    BrowserModule,
    BrowserTransferStateModule,
} from '@angular/platform-browser'

import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'

import { SharedModule } from './shared/shared.module'
import { TransferHttpCacheModule } from '@nguniversal/common'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        //  This interceptor should before my interceptor ,important!!!
        TransferHttpCacheModule,
        BrowserTransferStateModule,

        // my  module
        CoreModule,
        SharedModule,
        AppRoutingModule,
        // do not work,register in main.ts instead.
        //   ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        ServiceWorkerModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
