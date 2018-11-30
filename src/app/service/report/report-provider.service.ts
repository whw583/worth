import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import * as URL from 'url-parse'
import psl from 'psl'

@Injectable({
    providedIn: 'root',
})
export class ReportProviderService {
    constructor(private http: HttpClient) {}

    getReport(url: string) {
        return this.http.get(`/api/report/${url}`)
    }

    createReport(url: string) {
        return this.http.post(`/api/protected/${url}`, {})
    }

    updateReport(url: string) {
        return this.http.put(`/api/protected/${url}`, {})
    }
}
