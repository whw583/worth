import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'clientTimestamp',
})
export class ClientTimestampPipe implements PipeTransform {
    transform(diffTimestamp: number, args?: any): number {
        return Date.now() - Math.abs(diffTimestamp)
    }
}
