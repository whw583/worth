import {
    Component,
    OnInit,
    QueryList,
    ViewChildren,
    HostListener,
    Inject,
} from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { MatMenuTrigger } from '@angular/material'

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

    constructor(@Inject(DOCUMENT) private document: Document) {}

    ngOnInit() {
        this.setUrlWithoutSubdomain()
    }

    setUrlWithoutSubdomain() {
        let url = this.document.location.href.replace(/^https?:\/\//, '')
        this.protocolPrefix = this.document.location.protocol + '//'

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
