import { Component, OnInit } from '@angular/core'
import { RecaptchaService } from '../../service/recaptcha/recaptcha.service'
import { HttpClient, HttpParams } from '@angular/common/http'
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(
        private recaptchaService: RecaptchaService,
        private httpClient: HttpClient
    ) {}

    ngOnInit() {}
    async testRecaptcha() {
        const start = Date.now()
        const token = (await this.recaptchaService.getToken())

        console.log('time used---------')
        console.log(Date.now() - start)
        this.request(token, 'homepage', 'google.com')
    }

    request(token: string, action: string, domain: string) {
        const params = new HttpParams()
            .append('token', token)
            .append('action', action)

        this.httpClient
            .post(`/api/report/${domain}`, {}, { params })
            .subscribe(function(res) {
                console.log(res)
            })
    }
}
