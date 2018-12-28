import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core'
import { IReportData } from '../../../core/report/report-data.interface'
@Component({
    selector: 'app-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit {
    @Input()
    reportData: IReportData
    constructor() {}

    ngOnInit() {}
}
