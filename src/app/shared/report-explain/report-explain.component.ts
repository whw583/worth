import { Component, Input, OnInit } from '@angular/core'
import { IReportData } from '../../service/report/report-data.interface'

@Component({
  selector: 'app-report-explain',
  templateUrl: './report-explain.component.html',
  styleUrls: ['./report-explain.component.scss']
})
export class ReportExplainComponent implements OnInit {
    @Input()
    reportData: IReportData
  constructor() { }

  ngOnInit() {
  }

}
