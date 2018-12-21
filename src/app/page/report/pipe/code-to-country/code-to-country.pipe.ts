import { Inject, Pipe, PipeTransform } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ICountry } from './interface'
import { Observable, ReplaySubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { DOCUMENT } from '@angular/common'
@Pipe({
    name: 'codeToCountry',
})
export class CodeToCountryPipe implements PipeTransform {
    replaySubject = new ReplaySubject(1)

    constructor(
        private http: HttpClient,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.requestCountriesJson()
    }

    requestCountriesJson() {
        this.http
            .get<ICountry[]>('/assets/country-code-name/countries.json')
            .subscribe(res => {
                const obj: any = {}

                let subdomain = ''
                const host = this.document.location.hostname
                const prefix = host.split('.')[0]
                if (prefix.length === 2) {
                    subdomain = prefix
                }
                res.forEach(res => {
                    switch (subdomain) {
                        case 'cn':
                            obj[res.ISO2] = res.China
                            break
                        case 'hk':
                            obj[res.ISO2] = res.Hongkong
                            break

                        case 'tw':
                            obj[res.ISO2] = res.Taiwan
                            break

                        default:
                            obj[res.ISO2] = res.English
                    }
                })

                this.replaySubject.next(obj)
            })
    }

    transform(code: string, args?: any): Observable<string> {
        return this.replaySubject.pipe(
            map(res => {
                const name = res[code]
                if (!name) {
                    return code
                }
                return name
                    .replace(/\((.*?)\)/g, '')
                    .split('；')[0]
                    .split(',')[0]
            })
        )
    }
}
