import { Component, Input, OnInit } from '@angular/core'
import { IReportData } from '../../service/report/report-data.interface'

@Component({
  selector: 'app-report-ad-revenue',
  templateUrl: './report-ad-revenue.component.html',
  styleUrls: ['./report-ad-revenue.component.scss']
})
export class ReportAdRevenueComponent implements OnInit {
    @Input()
    reportData: IReportData
  constructor() { }

  ngOnInit() {
  }

}
