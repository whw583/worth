import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'localNumber',
})
export class LocalNumberPipe implements PipeTransform {
    transform(value: number | string, args?: any): string {
        // not sure is string
        value = value + ''

        const parsedValue = parseFloat(value)

        if (!parsedValue) {
            return value
        }

        if (parsedValue < 0) {
            return ' - '
        }

        return parsedValue.toLocaleString()
    }
}
