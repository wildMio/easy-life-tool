import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Classify } from './model/classify.model';
import { Column } from './model/column';
import { AccumulatorRecord } from './model/record.model';

@Component({
  selector: 'app-accumulator',
  templateUrl: './accumulator.component.html',
  styleUrls: ['./accumulator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccumulatorComponent {
  @HostBinding('class') class = 'grid height-100';

  total = 0;

  records: AccumulatorRecord[] = [];

  columns: Column[] = [
    {
      headerName: '數量',
      fieldId: 'number',
      width: '25%',
      visible: true,
      type: 'text',
    },
    {
      headerName: '建立日期',
      fieldId: 'createdDate',
      width: '25%',
      visible: true,
      type: 'date',
    },
    {
      headerName: '描述',
      fieldId: 'description',
      width: '25%',
      visible: true,
      type: 'text',
    },
    {
      headerName: '事件日期',
      fieldId: 'eventDate',
      width: '25%',
      visible: false,
      type: 'date',
    },
  ];

  activeClassify: Classify = { label: '預設' };

  classifies: Classify[] = [this.activeClassify];

  constructor() {}

  addRecord(record: AccumulatorRecord) {
    this.records = [record, ...this.records];
    this.total += parseFloat(record.number);
  }
}
