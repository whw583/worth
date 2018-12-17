import { Component, OnInit } from '@angular/core'
import { ReportProviderService } from '../../core/report/report-provider.service'
import { UrlService } from '../../core/url/url.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(
        private report: ReportProviderService,
        private url: UrlService
    ) {}

    ngOnInit() {}
}
