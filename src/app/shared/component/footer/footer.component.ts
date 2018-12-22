import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    time: string
    constructor() {
        this.initTime()
    }

    initTime() {
        const fullYear = new Date().getFullYear()
        if (fullYear <= 2018) {
            this.time = fullYear + ''
        } else {
            this.time = `2018 - ${fullYear}`
        }
    }

    ngOnInit() {}
}
