import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, BehaviorSubject } from 'rxjs'
import { skip } from 'rxjs/operators'
import { IReportData } from './report-data.interface'

@Injectable({
    providedIn: 'root',
})
export class ReportProviderService {
    private alertSubject = new BehaviorSubject<string>('')
    constructor(private http: HttpClient) {}

    updateReportAlert(dataUrl: string) {
        this.alertSubject.next(dataUrl)
    }

    getAlertSubject(): Observable<string> {
        return this.alertSubject.pipe(skip(1))
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
