import { Component } from '@angular/core'

export interface PeriodicElement {
    name: string
    position: number
    weight: number
    symbol: string
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
]

@Component({
    selector: 'app-estimations-table',
    templateUrl: './estimations-table.component.html',
    styleUrls: ['./estimations-table.component.scss'],
})
export class EstimationsTableComponent {
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']
    dataSource = ELEMENT_DATA
}
