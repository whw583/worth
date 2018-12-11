import { IReportData } from '../../service/report/report-data.interface'
import {
    Component,
    OnInit,
    ViewChild,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core'
import { MatSort, MatTableDataSource } from '@angular/material'

export interface IMapRankByCountryElement {
    code: string
    pageViews: number
    users: number
}

@Component({
    selector: 'app-report-rank-by-country',
    templateUrl: './report-rank-by-country.component.html',
    styleUrls: ['./report-rank-by-country.component.scss'],
})
export class ReportRankByCountryComponent implements OnInit, OnChanges {
    @Input()
    reportData: IReportData

    displayedColumns: string[] = ['code', 'pageViews', 'users']
    dataSource = new MatTableDataSource<IMapRankByCountryElement>([])

    @ViewChild(MatSort)
    sort: MatSort

    ngOnInit() {
        //  this.dataSource.sort = this.sort
    }

    ngOnChanges(changes: SimpleChanges) {
        const currentValue: IReportData = changes.reportData.currentValue
        if (currentValue) {
            const data = this.preProcessRankByCountryData(currentValue)
            this.dataSource = new MatTableDataSource<IMapRankByCountryElement>(
                data
            )
            //
            this.dataSource.sort = this.sort
        }
    }

    preProcessRankByCountryData(
        reportData: IReportData
    ): IMapRankByCountryElement[] {
        // map value
        const mapRankByCountry: IMapRankByCountryElement[] = reportData.rankByCountry
            .map(({ code, contribution: { pageViews, users } }) => {
                const pageViewsNum = Number(pageViews.split(/%$/).join(''))
                const usersNum = Number(users.split(/%$/).join(''))
                return { code, pageViews: pageViewsNum, users: usersNum }
            })
            .sort((a, b) => {
                return b.pageViews - a.pageViews
            })

        //

        return mapRankByCountry
    }
}
