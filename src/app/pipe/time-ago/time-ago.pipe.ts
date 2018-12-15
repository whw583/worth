import { Pipe, PipeTransform } from '@angular/core'
import { format } from 'timeago.js'
@Pipe({
    name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
    transform(value: any, args?: any): string {
        const absDiff = Math.abs(value)
        return format(Date.now() - absDiff)
    }
}
