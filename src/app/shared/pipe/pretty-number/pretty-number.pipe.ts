import { Pipe, PipeTransform } from '@angular/core'
import * as numeral from 'numeral'
@Pipe({
    name: 'prettyNumber',
})
export class PrettyNumberPipe implements PipeTransform {
    transform(value: number | string, args?: any): string {
        return numeral(value)
            .format('0.0a')
            .toUpperCase()
    }
}
