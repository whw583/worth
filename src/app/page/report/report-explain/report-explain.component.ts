import {
  Component,
  Input,
  OnInit,
  Inject,
  SimpleChanges,
  OnChanges, ViewEncapsulation,
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
        private translate: TranslateService
    ) {
        this.setLang()
        this.setExplainHtml()
    }

    ngOnChanges(changes: SimpleChanges) {
        const currentValue = changes.reportData.currentValue
        if (!currentValue) {
            return
        }
        this.reportSubject.next(currentValue)
    }

    setExplainHtml() {
        combineLatest(this.reportSubject, this.translate.get('explain'))
            .pipe(take(1))
            .subscribe(val => {
                this.explainHtml = this.processRawExplainString(val[0], val[1])

                console.log(this.explainHtml)
            })
        return
    }

    processRawExplainString(reportData: IReportData, explain: string): string {
        return explain
            .replace(/#dataUrl#/g, reportData.dataUrl)
            .replace(
                /#totalWorth#/g,
                `<span  >${this.transform(reportData.report.websiteWorth)}</span>`
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
