import { Component, OnInit, Input } from '@angular/core'
import { ReportProviderService } from '../../../core/report/report-provider.service'
import { IReportData } from '../../../core/report/report-data.interface'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-report-updater',
    templateUrl: './report-updater.component.html',
    styleUrls: ['./report-updater.component.scss'],
})
export class ReportUpdaterComponent implements OnInit {
    isUpdating = false

    @Input()
    reportData: IReportData

    constructor(
        private report: ReportProviderService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {}

    handClick() {
        this.isUpdating = true
        const dataUrl = this.route.snapshot.paramMap.get('dataUrl')
        console.log(dataUrl)
        this.report.updateReport(dataUrl).subscribe(
            () => {
                this.isUpdating = false
                this.report.updateReportAlert()
            },
            err => {
                console.log(err)
                this.isUpdating = false
            }
        )
    }
}
