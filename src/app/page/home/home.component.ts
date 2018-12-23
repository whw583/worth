import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Meta, Title } from '@angular/platform-browser'
import { take } from 'rxjs/operators'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(
        private translate: TranslateService,
        private title: Title,
        private meta: Meta
    ) {
        this.setHtmlHead()
    }

    setHtmlHead() {
        this.translate
            .get(['search.title', 'search.explain'])
            .pipe(take(1))
            .subscribe(val => {
                const searchTitle = val['search.title']
                const searchExplain = val['search.explain']

                this.title.setTitle(searchTitle)
                this.meta.addTag({
                    name: 'description',
                    content: searchExplain,
                })
            })
    }

    ngOnInit() {}
}
