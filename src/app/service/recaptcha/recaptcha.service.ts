import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class RecaptchaService {
    private token: string
    readonly grecaptcha = window['grecaptcha']
    private siteKey = '6Ld6uXgUAAAAAPEr8mu9C7Biggwm2L_oa2TMa0Op'
    constructor() {
      this.initialToken()
    }

    initialToken() {
        this.grecaptcha.ready(() => {
            this.grecaptcha
                .execute(this.siteKey, { action: 'action_name' })
                .then(token => {
                   this.token = token
                })
        })
    }

    getToken(): string {
        return this.token
    }
}
