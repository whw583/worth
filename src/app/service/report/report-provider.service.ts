import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class ReportProviderService {
    constructor(private http: HttpClient) {}

    getReport(dataUrl: string) {
        return this.http.get(`/api/report/${dataUrl}`)
    }

    createReport(dataUrl: string) {
        return this.http.post(`/api/protected/${dataUrl}`, {})
    }

    updateReport(dataUrl: string) {
        return this.http.put(`/api/protected/${dataUrl}`, {})
    }
}
