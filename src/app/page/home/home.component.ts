import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(private httpClient: HttpClient) {}

    ngOnInit() {}
    testRecaptcha() {
        this.request('google.com')
    }

    request(domain: string) {
        this.httpClient
            .post(`/api/report/${domain}`, {})
            .subscribe(function(res) {
                console.log(res)
            })
    }
}
