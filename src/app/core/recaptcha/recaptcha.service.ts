import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { interval } from 'rxjs'
import { ConfigService } from '../config/config.service'
import { DOCUMENT, isPlatformBrowser } from '@angular/common'

@Injectable({
    providedIn: 'root',
})
export class RecaptchaService {
    private readonly grecaptcha = this.document['grecaptcha']

    private readonly tokenLastTime = 1000 * 60

    private token: string
    private createTimestamp = 0
    private activeTimestamp = Date.now()
    private isUpdating = false

    constructor(
        private config: ConfigService,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.startup()
    }

    startup() {
        if (!isPlatformBrowser(this.platformId)) {
            return
        }
        this.warmTokenTimestamp()
        this.runTokenUpdateScheduler()
    }

    private warmTokenTimestamp() {
        setInterval(() => {
            if (!this.document.hidden) {
                this.activeTimestamp = Date.now()
            }
        }, 1000)
    }

    private runTokenUpdateScheduler() {
        interval(1000).subscribe(async () => {
            const now = Date.now()
            const isActive = now - this.activeTimestamp < this.tokenLastTime
            const isNew = now - this.createTimestamp < this.tokenLastTime

            if (isActive && !isNew && !this.isUpdating) {
                try {
                    // update begin
                    this.isUpdating = true

                    this.token = await this.requestToken()

                    // the token can be used again
                    this.createTimestamp = Date.now()
                    this.isUpdating = false
                } catch (e) {
                    this.isUpdating = false
                }
            }
        })
    }

    private requestToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                this.grecaptcha.ready(() => {
                    this.grecaptcha
                        .execute(this.config.recaptchaSiteKey, {
                            action: 'homepage',
                        })
                        .then(token => {
                            resolve(token)
                        })
                })
            } catch (e) {
                reject(e)
            }
        })
    }

    private catchOneToken(): string | null {
        const now = Date.now()
        const isNew = now - this.createTimestamp < this.tokenLastTime
        let token: string
        if (this.token && isNew) {
            // tell token update scheduler , you should update now
            this.createTimestamp = 0
            token = this.token
        }
        return token
    }

    private retryGetToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            let count = 0
            const id = setInterval(() => {
                const token: string = this.catchOneToken()
                count++

                if (token) {
                    clearInterval(id)
                    resolve(token)
                } else if (count > 10) {
                    clearInterval(id)
                    reject(
                        new Error(
                            'This my custom error in recaptcha.service .Can not get token after retry 50 times'
                        )
                    )
                }
            }, 500)
        })
    }

    async getToken() {
        let token = this.catchOneToken()

        try {
            if (!token) {
                token = await this.retryGetToken()
            }
        } catch (e) {
            token = await this.requestToken()
        }

        return token
    }
}
