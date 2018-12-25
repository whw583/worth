import { NgModule } from '@angular/core'
import { NotFoundComponent } from './not-found.component'
import { SharedModule } from '../../shared/shared.module'
@NgModule({
    declarations: [NotFoundComponent],
    exports: [NotFoundComponent],
    imports: [SharedModule],
})
export class NotFoundModule {}
