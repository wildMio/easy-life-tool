import { Pipe, PipeTransform } from '@angular/core';

import { Column } from '../../model/column';
import { AccumulatorRecord } from '../../model/record.model';

@Pipe({
  name: 'valueGetter',
})
export class ValueGetterPipe implements PipeTransform {
  transform(value: AccumulatorRecord, column: Column): any {
    return value?.[column.fieldId];
  }
}
