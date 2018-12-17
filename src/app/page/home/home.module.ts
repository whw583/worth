import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TopListComponent } from './top-list/top-list.component'
import { HomeComponent } from './home.component'
import { SharedModule } from '../../shared/shared.module'
import { SearchModule } from '../../feature/search/search.module'

@NgModule({
    declarations: [HomeComponent, TopListComponent],
    exports: [HomeComponent, TopListComponent],
    imports: [CommonModule, SharedModule, SearchModule],
})
export class HomeModule {}
