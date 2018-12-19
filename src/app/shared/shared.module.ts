import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FooterComponent } from './component/footer/footer.component'
import { ToolbarComponent } from './component/toolbar/toolbar.component'
import { MaterialModule } from './module/material/material.module'
import { MyMomentModule } from './module/my-moment/my-moment.module'

import { PrettyNumberPipe } from './pipe/pretty-number/pretty-number.pipe'
import { ClientTimestampPipe } from './pipe/client-timestamp/client-timestamp.pipe'
import { LocalNumberPipe } from './pipe/local-number/local-number.pipe'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
    declarations: [
        // component
        FooterComponent,
        ToolbarComponent,

        // pipe
        ClientTimestampPipe,
        LocalNumberPipe,
        PrettyNumberPipe,
    ],
    exports: [
        // component
        FooterComponent,
        ToolbarComponent,

        // module
        MaterialModule,
        MyMomentModule,

        // pipe
        ClientTimestampPipe,
        LocalNumberPipe,
        PrettyNumberPipe,
        //
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        CommonModule,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MyMomentModule,
    ],
})
export class SharedModule {}
