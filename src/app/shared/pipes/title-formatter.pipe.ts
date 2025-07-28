import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'titleFormatter'
})
export class TitleFormatterPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return '';
        return value
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/[_\-]+/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }
}
