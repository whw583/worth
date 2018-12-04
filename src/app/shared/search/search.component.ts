import { Component, OnInit } from '@angular/core'
import { ReportProviderService } from '../../service/report/report-provider.service'
import { UrlService } from '../../service/url/url.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    value = ''
    showProgressBar = false
    showRequestError = false
    showInvalidUrl = false

    constructor(
        private report: ReportProviderService,
        private url: UrlService,
        private router: Router
    ) {}

    ngOnInit() {}

    handleClick() {
        // do nothing when processing
        if (this.showProgressBar) {
            return
        }

        const dataUrl = this.url.getDataUrl(this.value)
        if (!dataUrl) {
            // show invalid url
            this.showInvalidUrl = true
            return
        }

        // show processing block
        this.showProgressBar = true

        this.report.createReport(dataUrl).subscribe(
            async () => {
                await this.router.navigateByUrl(`/report/${dataUrl}`)
                console.log('success')
            },
            error => {
                console.log('error...')
                console.log(error)
                this.showRequestError = true
                this.showProgressBar = false
            },
            () => {
                console.log('complete ...')
                // hide processing message block
                this.showProgressBar = false
            }
        )
    }

    onValueChange(e) {
        this.showRequestError = false
        this.showInvalidUrl = false
    }
}
