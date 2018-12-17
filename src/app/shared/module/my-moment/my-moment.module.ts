import { NgModule } from '@angular/core'
import { MomentModule } from 'ngx-moment'
import './moment-locale'

@NgModule({
    exports: [MomentModule],
})
export class MyMomentModule {}
