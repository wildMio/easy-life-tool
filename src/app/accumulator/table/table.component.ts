import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { auditTime, map, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { Column } from '../model/column';
import { AccumulatorRecord } from '../model/record.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnDestroy {
  @HostBinding('class') class = 'grid h-full grid-rows-[auto_1fr]';

  private readonly destroy$ = new Subject<void>();

  readonly records$ = new BehaviorSubject<AccumulatorRecord[] | null>([]);
  @Input() get records(): AccumulatorRecord[] | null {
    return this._records;
  }
  set records(value: AccumulatorRecord[] | null) {
    this._records = value;
    this.records$.next(value);
  }
  private _records: AccumulatorRecord[] | null = [];

  readonly columns$ = new BehaviorSubject<Column[]>([]);
  displayColumns$ = this.columns$.pipe(
    map((columns) => columns.filter((column) => column.visible))
  );
  @Input() get columns(): Column[] {
    return this._columns;
  }
  set columns(value: Column[]) {
    this._columns = value;
    this.columns$.next(value);
  }
  private _columns: Column[] = [];

  @Input() selectable = false;
  @Input() set selectedItems(value: AccumulatorRecord[] | null) {
    this.selectItems$.next(value ?? []);
  }
  readonly selectItems$ = new BehaviorSubject<AccumulatorRecord[]>([]);
  @Output() selectItems = this.selectItems$;
  readonly selectedItemSet$ = this.selectItems$.pipe(
    map((items) => new Set(items ?? [])),
    takeUntil(this.destroy$),
    shareReplay(1)
  );

  readonly isSelectedAll$ = combineLatest([
    this.records$,
    this.selectItems$,
  ]).pipe(
    auditTime(0),
    map(
      ([records, selectedItems]) =>
        !!records?.length && records.length === selectedItems?.length
    )
  );

  constructor() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectRecord(event: MatCheckboxChange, record: AccumulatorRecord) {
    const selectItems = this.selectItems$.getValue();
    if (event.checked) {
      selectItems.push(record);
    } else {
      const index = selectItems.indexOf(record);
      selectItems.splice(index, 1);
    }
    this.selectItems$.next(selectItems);
  }

  selectAll(event: MatCheckboxChange) {
    const selectedItems = event.checked ? this.records?.slice() ?? [] : [];
    this.selectItems$.next(selectedItems);
  }
}
