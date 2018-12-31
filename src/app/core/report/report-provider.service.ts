import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'
import { IReportData } from './report-data.interface'

@Injectable({
    providedIn: 'root',
})
export class ReportProviderService {
    private alertSubject = new Subject()
    constructor(private http: HttpClient) {}

    updateReportAlert() {
        this.alertSubject.next()
    }

    getAlertSubject(): Observable<any> {
        return this.alertSubject.asObservable()
    }

    getReport(dataUrl: string): Observable<IReportData> {
        return this.http.get<IReportData>(`/api/report/${dataUrl}`)
    }

    createReport(dataUrl: string) {
        return this.http.post(`/api/report/protected/${dataUrl}`, {})
    }

    updateReport(dataUrl: string) {
        return this.http.put(`/api/report/protected/${dataUrl}`, {})
    }
}
