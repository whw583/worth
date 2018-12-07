import { Component, Input, OnInit } from '@angular/core'
import { IReportData } from '../../service/report/report-data.interface'

@Component({
  selector: 'app-report-contributing-subdomains',
  templateUrl: './report-contributing-subdomains.component.html',
  styleUrls: ['./report-contributing-subdomains.component.scss']
})
export class ReportContributingSubdomainsComponent implements OnInit {
    @Input()
    reportData: IReportData
  constructor() { }

  ngOnInit() {
  }

}
