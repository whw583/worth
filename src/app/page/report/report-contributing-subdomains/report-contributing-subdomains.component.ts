import {
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
    AfterViewInit,
    Inject,
    PLATFORM_ID,
} from '@angular/core'
import {
    IReportData,
    IContributingSubdomain,
} from '../../../core/report/report-data.interface'
import { Chart } from 'chart.js'
import { ReplaySubject } from 'rxjs'
import { take } from 'rxjs/operators'
import { IChartData } from './chart-data-interface'
import { isPlatformBrowser } from '@angular/common'
@Component({
    selector: 'app-report-contributing-subdomains',
    templateUrl: './report-contributing-subdomains.component.html',
    styleUrls: ['./report-contributing-subdomains.component.scss'],
})
export class ReportContributingSubdomainsComponent
    implements OnInit, AfterViewInit {
    @ViewChild('myChartRef')
    myChartRef: ElementRef<HTMLCanvasElement>
    viewChildSubject = new ReplaySubject(1)
    chart: Chart

    @Input()
    set reportData(reportData: IReportData) {
        if (!reportData) {
            return
        }
        this.viewChildSubject.pipe(take(1)).subscribe(() => {
            this.createChart(reportData)
        })
    }

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit() {}

    getChartData(reportData: IReportData): IChartData[] {
        const { contributingSubdomains, dataUrl } = reportData

        // extra data
        const dataArr = contributingSubdomains.map(
            ({ dataUrl, pageViews: { percentage } }) => {
                const percentageNum = Number(percentage.split(/%$/).join(''))
                return { dataUrl, percentageNum }
            }
        )

        // sort data
        const sortedDataArr = dataArr.sort(function(a, b) {
            return b.percentageNum - a.percentageNum
        })

        //
        let chartDataArr: IChartData[] = []

        //
        if (sortedDataArr.length > 5) {
            // max element is
            const dataArrSlice = sortedDataArr.slice(0, 4)

            let otherNumber =
                100 -
                dataArrSlice.reduce(
                    (previousValue, { percentageNum }) =>
                        previousValue + percentageNum,
                    0
                )
            // make sure otherNumber is like 10.55
            otherNumber = Math.round(otherNumber * 100) / 100

            dataArrSlice.push({ dataUrl: 'other', percentageNum: otherNumber })
            chartDataArr = dataArrSlice
        } else if (sortedDataArr.length === 0) {
            chartDataArr.push({ dataUrl, percentageNum: 100 })
        } else {
            // sortedDataArr length 1 to 4
            chartDataArr = sortedDataArr
        }

        return chartDataArr
    }

    createChart(reportData: IReportData) {
        // only run in browser ,because angular universal ssr
        if (!isPlatformBrowser(this.platformId)) {
            return
        }

        if (this.chart) {
            this.chart.destroy()
        }

        const chartDataArr = this.getChartData(reportData)

        // labels
        const dataUrlArr = chartDataArr.map(({ dataUrl }) => dataUrl)

        // data
        const percentageNumArr = chartDataArr.map(
            ({ percentageNum }) => percentageNum
        )

        // backgroundColor
        const backgroundColorArr = [
            '#3e95cd',
            '#8e5ea2',
            '#3cba9f',
            '#e8c3b9',
            '#c45850',
        ].slice(0, chartDataArr.length)

        //
        const ctx = this.myChartRef.nativeElement.getContext('2d')

        //
        this.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: dataUrlArr,
                datasets: [
                    {
                        label: 'Population (millions)',
                        backgroundColor: backgroundColorArr,
                        data: percentageNumArr,
                    },
                ],
            },
            options: {
                title: {
                    display: false,
                    text: 'Contributing Subdomains',
                },
            },
        })
    }

    ngAfterViewInit(): void {
        this.viewChildSubject.next(true)
    }
}
