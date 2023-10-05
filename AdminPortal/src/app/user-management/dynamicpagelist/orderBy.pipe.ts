import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(array: any[], field: string, ascending: boolean = true): any[] {
    if (!Array.isArray(array) || !field) {
      return array;
    }

    const order = ascending ? 1 : -1;

    return array.sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      // Check if the field is a date string and convert it to Date objects
      if (field === 'CreatedDate') {
        aValue = this.datePipe.transform(aValue, 'dd-MM-yyyy');
        bValue = this.datePipe.transform(bValue, 'dd-MM-yyyy');
      }

      if (aValue < bValue) {
        return -1 * order;
      } else if (aValue > bValue) {
        return 1 * order;
      } else {
        return 0;
      }
    });
  }
}
