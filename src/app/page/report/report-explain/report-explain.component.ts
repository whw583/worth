import { Component, Input, OnInit, Inject } from '@angular/core'
import { IReportData } from '../../../core/report/report-data.interface'
import { DOCUMENT } from '@angular/common'

@Component({
    selector: 'app-report-explain',
    templateUrl: './report-explain.component.html',
    styleUrls: ['./report-explain.component.scss'],
})
export class ReportExplainComponent implements OnInit {
    @Input()
    reportData: IReportData
    lang: string
    constructor(@Inject(DOCUMENT) private document: Document) {
        this.setLang()
    }


    setLang() {
        const hostNamePrefix = this.document.location.hostname.split('.')[0]
        if (hostNamePrefix.length === 2) {
            this.lang = hostNamePrefix
        }
    }

    ngOnInit() {}
}
