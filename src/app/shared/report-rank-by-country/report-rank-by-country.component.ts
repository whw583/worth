import { Component, Input, OnInit } from '@angular/core'
import { IReportData } from '../../service/report/report-data.interface'

@Component({
  selector: 'app-report-rank-by-country',
  templateUrl: './report-rank-by-country.component.html',
  styleUrls: ['./report-rank-by-country.component.scss']
})
export class ReportRankByCountryComponent implements OnInit {
    @Input()
    reportData: IReportData
  constructor() { }

  ngOnInit() {
  }

}
