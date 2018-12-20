import { Component, OnInit, ViewChild } from '@angular/core'
import { MatSort, MatTableDataSource } from '@angular/material'
import { HttpClient } from '@angular/common/http'
import { ITopListElement } from './interface'

/**
 * @title Table with sorting
 */
@Component({
    selector: 'app-top-list',
    templateUrl: './top-list.component.html',
    styleUrls: ['./top-list.component.scss'],
})
export class TopListComponent implements OnInit {
    displayedColumns: string[] = [
        'websiteWorth',
        'lastModified',
        'dataUrl',
      //  'rank',
    ]
    dataSource = new MatTableDataSource<ITopListElement>([])

    @ViewChild(MatSort)
    sort: MatSort

    constructor(private http: HttpClient) {
        this.requestData()
    }

    requestData() {
        this.http
            .get<ITopListElement[]>('/api/top-sites-list')
            .subscribe(res => {
                this.dataSource = new MatTableDataSource(res)
                this.dataSource.sort = this.sort
            })
    }

    ngOnInit() {
        //  this.dataSource.sort = this.sort
    }
}
