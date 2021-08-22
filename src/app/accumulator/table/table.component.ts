import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Column } from '../model/column';
import { AccumulatorRecord } from '../model/record.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @HostBinding('class') class = 'grid height-100';

  @Input() records: AccumulatorRecord[] = [];

  columns$ = new BehaviorSubject<Column[]>([]);
  displayColumns$ = this.columns$.pipe(
    map((columns) => columns.filter((column) => column.visible))
  );
  @Input()
  public get columns(): Column[] {
    return this._columns;
  }
  public set columns(value: Column[]) {
    this._columns = value;
    this.columns$.next(value);
  }
  private _columns: Column[] = [];

  constructor() {}
}
