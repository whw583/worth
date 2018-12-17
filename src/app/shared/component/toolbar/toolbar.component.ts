import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    show = false
    title = 'Home'

    constructor() {}
    ngOnInit() {}

    handleMenuButtonClick() {
        this.show = !this.show
    }
}
