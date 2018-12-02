import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'
import { IReportData } from './report-data.interface'

@Injectable({
    providedIn: 'root',
})
export class ReportProviderService {
    private alertSubject = new Subject<string>()
    constructor(private http: HttpClient) {}

    updateReportAlert(dataUrl: string) {
        this.alertSubject.next(dataUrl)
    }

    getAlertSubject(): Subject<string> {
        return this.alertSubject
    }

    getReport(dataUrl: string): Observable<IReportData> {
        return this.http.get<IReportData>(`/api/report/${dataUrl}`)
    }

    createReport(dataUrl: string) {
        return this.http.post(`/api/protected/report/${dataUrl}`, {})
    }

    updateReport(dataUrl: string) {
        return this.http.put(`/api/protected/report/${dataUrl}`, {})
    }
}
