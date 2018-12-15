import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'clientNow',
})
export class ClientNowPipe implements PipeTransform {
    transform(diff: number, args?: any): number {
        const clientTimestamp = Date.now() - Math.abs(diff)
        console.log(clientTimestamp)
        return clientTimestamp
    }
}
