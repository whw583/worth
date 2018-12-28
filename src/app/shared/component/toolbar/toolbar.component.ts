import {
    Component,
    OnInit,
    QueryList,
    ViewChildren,
    HostListener,
    Inject,
    OnDestroy,
} from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { MatMenuTrigger } from '@angular/material'
import { ActivatedRoute } from '@angular/router'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
    show = false
    url: string
    protocolPrefix: string
    unSubscribe = new Subject()

    @ViewChildren(MatMenuTrigger)
    triggers: QueryList<MatMenuTrigger>

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.url
            .pipe(takeUntil(this.unSubscribe))
            .subscribe(() => {
                this.setUrlWithoutSubdomain()
            })
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

    ngOnDestroy(): void {
        // close
        this.unSubscribe.next()
        this.unSubscribe.complete()
    }
}
