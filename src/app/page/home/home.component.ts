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

    testRecaptcha() {
        const token = this.recaptchaService.getToken()
        console.log('test recaptcha')
        console.log(this.recaptchaService.getToken())
        const params = new HttpParams()
        params.append('token', token)

        this.httpClient
            .get(`/api/test?token=${token}`, { params: params })
            .subscribe(res => {
                console.log(res)
            })
    }
}
