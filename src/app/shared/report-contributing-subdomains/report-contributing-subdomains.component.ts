import {
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
    AfterViewInit,
} from '@angular/core'
import {
    IReportData,
    IContributingSubdomain,
} from '../../service/report/report-data.interface'
import { Chart } from 'chart.js'
import { ReplaySubject } from 'rxjs'
import { take } from 'rxjs/operators'
@Component({
    selector: 'app-report-contributing-subdomains',
    templateUrl: './report-contributing-subdomains.component.html',
    styleUrls: ['./report-contributing-subdomains.component.scss'],
})
export class ReportContributingSubdomainsComponent
    implements OnInit, AfterViewInit {
    @ViewChild('myChartRef')
    myChartRef: ElementRef<HTMLCanvasElement>
    contributingSubdomains: IContributingSubdomain[]
    viewChildSubject = new ReplaySubject(1)
    chart: Chart

    @Input()
    set reportData(reportData: IReportData) {
        if (!reportData) {
            return
        }
        this.viewChildSubject.pipe(take(1)).subscribe(() => {
            this.createChart()
        })
    }

    constructor() {}

    ngOnInit() {}

    createChart() {
        if (this.chart) {
            this.chart.destroy()
        }

        const ctx = this.myChartRef.nativeElement.getContext('2d')
        this.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [
                    'Africa',
                    'Asia',
                    'Europe',
                    'Latin America',
                    'North America',
                ],
                datasets: [
                    {
                        label: 'Population (millions)',
                        backgroundColor: [
                            '#3e95cd',
                            '#8e5ea2',
                            '#3cba9f',
                            '#e8c3b9',
                            '#c45850',
                        ],
                        data: [2478, 5267, 734, 784, 433],
                    },
                ],
            },
            options: {
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050',
                },
            },
        })
    }

    ngAfterViewInit(): void {
        this.viewChildSubject.next(true)
    }
}
