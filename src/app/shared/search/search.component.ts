import { Component, OnInit } from '@angular/core'
import { ReportProviderService } from '../../service/report/report-provider.service'
import { UrlService } from '../../service/url/url.service'
import { Router } from '@angular/router'
import {timeout} from 'rxjs/operators'

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    value = ''
    showProgressBar = false
    showRequestError = false
    showRequestErrorUnauth = false
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

        // clear error message
        this.clearErrorMessage()

        const dataUrl = this.url.getDataUrl(this.value)
        if (!dataUrl) {
            // show invalid url
            this.showInvalidUrl = true
            return
        }

        // show processing block
        this.showProgressBar = true

        this.report.createReport(dataUrl).pipe(timeout(20000)).subscribe(
            async () => {
                await this.router.navigateByUrl(`/report/${dataUrl}`)
                console.log('success')
            },
            error => {
                const status: number = error.status
                if (status === 401) {
                    this.showRequestErrorUnauth = true
                } else {
                    this.showRequestError = true
                }
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
        this.clearErrorMessage()
    }

    clearErrorMessage() {
        this.showRequestError = false
        this.showRequestErrorUnauth = false
        this.showInvalidUrl = false
    }
}
