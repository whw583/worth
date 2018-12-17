import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DataGridComponent } from './data-grid/data-grid.component'
import { SearchComponent } from './search/search.component'
import { SharedModule } from '../../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'
@NgModule({
    declarations: [DataGridComponent, SearchComponent],
    exports: [SearchComponent],
    imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export class SearchModule {}
