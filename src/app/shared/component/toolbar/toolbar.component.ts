import {
    Component,
    OnInit,
    QueryList,
    ViewChildren,
    HostListener,
} from '@angular/core'
import { MatMenuTrigger } from '@angular/material'
import psl from 'psl'

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    show = false
    title = 'Home'
    url: string
    protocolPrefix: string

    @ViewChildren(MatMenuTrigger)
    triggers: QueryList<MatMenuTrigger>
    constructor() {}
    ngOnInit() {
        this.setUrlWithoutSubdomain()
    }

    setUrlWithoutSubdomain() {
        let url = window.location.href.replace(/^https?:\/\//, '')
        this.protocolPrefix = window.location.protocol + '//'
        console.log(window.location)
        const urlSplitArr = url.split('.')

        if (urlSplitArr[0].length === 2) {
            urlSplitArr.shift()
            url = urlSplitArr.join('.')
        }

        this.url = url
    }

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
