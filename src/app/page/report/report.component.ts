import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, UrlSegment } from '@angular/router'
import { ReportProviderService } from '../../service/report/report-provider.service'
import { UrlService } from '../../service/url/url.service'
import { Subscription } from 'rxjs'
import { IReportData } from '../../service/report/report-data.interface'

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
    reportData: IReportData
    urlSubscription: Subscription

    constructor(
        private activatedRoute: ActivatedRoute,
        private report: ReportProviderService,
        private url: UrlService
    ) {}

    ngOnInit() {
        this.handleUrlChange()
    }

    setReportData() {
        const url = this.activatedRoute.snapshot.paramMap.get('dataUrl')
        const dataUrl = this.url.getDataUrl(url)
        if (!dataUrl) {
            console.log('not valid dataUrl' + url)
            this.reportData = null
            return
        }

        this.report.getReport(dataUrl).subscribe(
            reportData => {
                this.reportData = reportData
            },
            error => {
                this.reportData = null
            }
        )
    }

    handleUrlChange() {
        this.urlSubscription = this.activatedRoute.url.subscribe(
            (urlSegmentArr: UrlSegment[]) => {
                console.log('url subscribe run ----------------------')
                this.setReportData()
            }
        )
    }

    ngOnDestroy() {
        this.urlSubscription.unsubscribe()
    }
}
