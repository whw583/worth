import { Component, Input, OnInit } from '@angular/core'
import { IReportData } from '../../service/report/report-data.interface'

@Component({
  selector: 'app-report-alexa-rank',
  templateUrl: './report-alexa-rank.component.html',
  styleUrls: ['./report-alexa-rank.component.scss']
})
export class ReportAlexaRankComponent implements OnInit {
    @Input()
    reportData: IReportData
  constructor() { }

  ngOnInit() {
  }

}
