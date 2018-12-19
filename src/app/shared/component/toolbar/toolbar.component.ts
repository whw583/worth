import {
    Component,
    OnInit,
    QueryList,
    ViewChildren,
    HostListener,
} from '@angular/core'
import { MatMenuTrigger } from '@angular/material'

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    show = false
    title = 'Home'

    @ViewChildren(MatMenuTrigger)
    triggers: QueryList<MatMenuTrigger>
    constructor() {}
    ngOnInit() {}

    handleMenuButtonClick() {
        this.show = !this.show
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize(e) {
        this.closeMyMenu()
    }

    closeMyMenu() {
        this.triggers.forEach(trigger => trigger.closeMenu())
    }
}
