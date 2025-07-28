import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import 'moment/locale/id';

@Pipe({
    name: 'dateFormatter',
})
export class DateFormatterPipe implements PipeTransform {
    constructor() {
        moment.locale('id');
    }

    transform(
        value: string | Date | moment.Moment,
        format: string = 'HH:mm:ss, D MMMM YYYY'
    ): string {
        const m = moment(value);
        return m.isValid() ? m.format(format) : '-';
    }
}

