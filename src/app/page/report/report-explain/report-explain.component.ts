import {
    Component,
    Input,
    OnInit,
    Inject,
    SimpleChanges,
    OnChanges,
} from '@angular/core'
import { IReportData } from '../../../core/report/report-data.interface'
import { DOCUMENT } from '@angular/common'
import { TranslateService } from '@ngx-translate/core'
import { Meta, Title } from '@angular/platform-browser'
import { take } from 'rxjs/operators'
import { Subject, combineLatest } from 'rxjs'

@Component({
    selector: 'app-report-explain',
    templateUrl: './report-explain.component.html',
    styleUrls: ['./report-explain.component.scss'],
})
export class ReportExplainComponent implements OnInit, OnChanges {
    reportSubject = new Subject<IReportData>()
    @Input()
    reportData: IReportData
    lang: string
    explainHtml = ''
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private translate: TranslateService,
        private title: Title,
        private meta: Meta
    ) {
        this.setLang()
        this.setExplainHtmlAndHead()
    }

    ngOnChanges(changes: SimpleChanges) {
        const currentValue = changes.reportData.currentValue
        if (!currentValue) {
            return
        }
        this.reportSubject.next(currentValue)
    }

    setExplainHtmlAndHead() {
        combineLatest(
            this.reportSubject,
            this.translate.get(['explain', 'reportPage.title'])
        )
            .pipe(take(1))
            .subscribe(val => {
                const explainString = val[1]['explain']
                const titleString = val[1]['reportPage.title']

                const reportData = val[0]

                this.explainHtml = this.processRawExplainString(
                    reportData,
                    explainString
                )

                // set title
                this.title.setTitle(
                    this.processRawTitleString(reportData, titleString)
                )

                // set description
                this.meta.updateTag({
                    name: 'description',
                    content: this.processRawExplainStringToDescription(
                        reportData,
                        explainString
                    ),
                })
            })
    }

    processRawTitleString(reportData: IReportData, title: string): string {
        return title.replace(/#dataUrl#/g, reportData.dataUrl)
    }

    processRawExplainString(reportData: IReportData, explain: string): string {
        return explain
            .replace(/#dataUrl#/g, reportData.dataUrl)
            .replace(
                /#totalWorth#/g,
                `<span  >${this.transform(
                    reportData.report.websiteWorth
                )}</span>`
            )
            .replace(
                /#dailyIncome#/g,
                `<span>${this.transform(
                    reportData.report.reportStatistics[4].revenue
                )}</span>`
            )
            .replace(
                /#UV#/g,
                `<span>${this.transform(
                    reportData.report.reportStatistics[4].uniqueVisitors
                )}</span>`
            )
            .replace(
                /#PV#/g,
                `<span>${this.transform(
                    reportData.report.reportStatistics[4].uniquePageViews
                )}</span>`
            )
            .replace(
                /#rank#/g,
                `<span>${this.transform(reportData.rank)}</span>`
            )
    }

    processRawExplainStringToDescription(
        reportData: IReportData,
        explain: string
    ): string {
        return explain
            .replace(/#dataUrl#/g, reportData.dataUrl)
            .replace(
                /#totalWorth#/g,
                `${this.transform(reportData.report.websiteWorth)}`
            )
            .replace(
                /#dailyIncome#/g,
                `${this.transform(
                    reportData.report.reportStatistics[4].revenue
                )}`
            )
            .replace(
                /#UV#/g,
                `${this.transform(
                    reportData.report.reportStatistics[4].uniqueVisitors
                )}`
            )
            .replace(
                /#PV#/g,
                `${this.transform(
                    reportData.report.reportStatistics[4].uniquePageViews
                )}`
            )
            .replace(/#rank#/g, `${this.transform(reportData.rank)}`)
    }

    transform(value: number | string): string {
        // not sure is string
        value = value + ''

        const parsedValue = parseFloat(value)

        if (!parsedValue) {
            return value
        }

        if (parsedValue < 0) {
            return ' - '
        }

        return parsedValue.toLocaleString()
    }

    setLang() {
        const hostNamePrefix = this.document.location.hostname.split('.')[0]
        if (hostNamePrefix.length === 2) {
            this.lang = hostNamePrefix
        }
    }

    ngOnInit() {}
}
