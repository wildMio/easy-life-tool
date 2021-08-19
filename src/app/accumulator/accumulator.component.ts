import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccumulatorRecord } from './model/record.model';

@Component({
  selector: 'app-accumulator',
  templateUrl: './accumulator.component.html',
  styleUrls: ['./accumulator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccumulatorComponent {
  total = 0;

  records: AccumulatorRecord[] = [];

  constructor() {}

  addRecord(record: AccumulatorRecord) {
    this.records = [record, ...this.records];
    this.total += parseFloat(record.number);
  }
}
