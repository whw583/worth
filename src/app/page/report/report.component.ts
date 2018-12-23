import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, UrlSegment } from '@angular/router'
import { ReportProviderService } from '../../core/report/report-provider.service'
import { UrlService } from '../../core/url/url.service'
import { Subject } from 'rxjs'
import { take, takeUntil } from 'rxjs/operators'
import { IReportData } from '../../core/report/report-data.interface'
import { TranslateService } from '@ngx-translate/core'
import { Meta, Title } from '@angular/platform-browser'

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
    reportData: IReportData
    private ngUnsubscribe = new Subject()

    constructor(
        private activatedRoute: ActivatedRoute,
        private report: ReportProviderService,
        private url: UrlService,
        private translate: TranslateService,
        private title: Title,
        private meta: Meta
    ) {
        this.setHtmlHead()
    }

    setHtmlHead() {
        this.translate
            .get(['search.title', 'search.explain'])
            .pipe(take(1))
            .subscribe(val => {
                const searchTitle = val['search.title']
                const searchExplain = val['search.explain']

                this.title.setTitle(searchTitle)
                this.meta.addTag({
                    name: 'description',
                    content: searchExplain,
                })
            })
    }

    ngOnInit() {
        this.handleUrlChange()
        this.handleUpdateAlert()
    }

    handleUpdateAlert() {
        this.report
            .getAlertSubject()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                this.setReportData()
            })
    }

    setReportData() {
        const url = this.activatedRoute.snapshot.paramMap.get('dataUrl')
        const dataUrl = this.url.getDataUrl(url)
        if (!dataUrl) {
            console.log('not valid dataUrl' + url)
            this.reportData = null
            return
        }

        // http observable
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
        this.activatedRoute.url
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((urlSegmentArr: UrlSegment[]) => {
                this.setReportData()
            })
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.complete()
    }
}
