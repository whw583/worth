import { Injectable } from '@angular/core'
import psl from 'psl'

@Injectable({
    providedIn: 'root',
})
export class UrlService {
    constructor() {}

    getDataUrl(url: string): string | null {
        const hostName = url
            .trim()
            .replace(/^https?:\/\//, '')
            .split('/')[0]

        const isValid = psl.isValid(hostName)

        const { domain } = psl.parse(hostName)

        if (isValid && domain) {
            return domain
        } else {
            return null
        }
    }
}
