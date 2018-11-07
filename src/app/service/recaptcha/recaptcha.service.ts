import { Injectable } from '@angular/core'
import { fromEvent, merge, interval, from } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class RecaptchaService {
    private readonly grecaptcha = window['grecaptcha']
    private readonly siteKey = '6Ld6uXgUAAAAAPEr8mu9C7Biggwm2L_oa2TMa0Op'
    private readonly tokenLastTime = 1000 * 60

    private token: string
    private createTimestamp = 0
    private activeTimestamp = Date.now()
    private isUpdating = false

    constructor() {
        // this.warmTokenTimestamp()
        // this.runTokenUpdateScheduler()
    }

    private warmTokenTimestamp() {
        merge(
            fromEvent(document, 'click'),
            fromEvent(document, 'scroll'),
            fromEvent(document, 'touchmove'),
            fromEvent(document, 'keypress')
        ).subscribe(event => {
            this.activeTimestamp = Date.now()
        })
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
                        .execute(this.siteKey, { action: 'action_name' })
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
                } else if (count > 50) {
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

        if (!token) {
            token = await this.retryGetToken()
        }

        return token
    }
}
