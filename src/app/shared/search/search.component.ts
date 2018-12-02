import { Component, OnInit } from '@angular/core'
import { ReportProviderService } from '../../service/report/report-provider.service'
import { UrlService } from '../../service/url/url.service'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    value = 'test'

    constructor(
        private report: ReportProviderService,
        private url: UrlService,
        private router: Router
    ) {}
    test() {
        console.log(this)
    }

    handleClick() {
        const dataUrl = this.url.getDataUrl(this.value)
        if (!dataUrl) {
            return
        }
        this.report.createReport(dataUrl).subscribe(
            async () => {
                await this.router.navigateByUrl(`/report/${dataUrl}`)
                console.log('success')
            },
            error => {
                console.log('error')
                console.log(error)
            }
        )
    }

    ngOnInit() {}
}
