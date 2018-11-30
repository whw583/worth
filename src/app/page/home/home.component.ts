import { Component, OnInit } from '@angular/core'
import { ReportProviderService } from '../../service/report/report-provider.service'
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(private report: ReportProviderService) {}

    ngOnInit() {}
    test() {
        this.report.getReport('google.com').subscribe(res => {
            console.log(res)
        })
    }
}
