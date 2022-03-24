import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { BehaviorSubject, combineLatest, forkJoin, of, Subject } from 'rxjs';
import { auditTime, concatMap, map, takeUntil, tap } from 'rxjs/operators';

import { uuid } from '../util/uuid';
import { Classify } from './model/classify.model';
import { Column } from './model/column';
import { AccumulatorRecord } from './model/record.model';
import { AccumulatorIdbService } from './service/accumulator-idb.service';

@Component({
  selector: 'app-accumulator',
  templateUrl: './accumulator.component.html',
  styleUrls: ['./accumulator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccumulatorComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'grid grid-rows-[auto_auto_1fr] h-full';

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

  readonly classifies$ = new BehaviorSubject<Classify[]>([]);
  readonly activeClassifyCode$ = new BehaviorSubject<string>('');
  readonly activeClassify$ = combineLatest([
    this.classifies$,
    this.activeClassifyCode$,
  ]).pipe(
    auditTime(0),
    map(([classifies, activeClassifyCode]) =>
      classifies.find(
        (classify) => classify.classifyCode === activeClassifyCode
      )
    )
  );

  readonly records$ = new BehaviorSubject<AccumulatorRecord[]>([]);

  readonly total$ = new BehaviorSubject<number>(0);

  selectable = false;

  selectedItems$ = new BehaviorSubject<AccumulatorRecord[]>([]);

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly idbService: AccumulatorIdbService) {}

  ngOnInit() {
    this.idbService
      .getClassifies()
      .pipe(
        concatMap((classifies) => {
          if (!classifies.length) {
            const classifyCode = uuid();
            const classify = { label: '預設', classifyCode };
            return forkJoin([
              this.idbService.addClassify(classify),
              this.idbService.changeActiveClassify(classifyCode),
            ]).pipe(map(() => [classify]));
          }
          return of(classifies);
        }),
        tap((classifies) => this.classifies$.next(classifies)),
        concatMap(() => this.idbService.getActiveClassifyCode()),
        tap((activeClassifyCode) => {
          this.activeClassifyCode$.next(activeClassifyCode ?? '');
        }),
        concatMap((activeClassifyCode) =>
          this.idbService.getTotalByClassifyCode(activeClassifyCode).pipe(
            tap((total) => this.total$.next(total ?? 0)),
            map(() => activeClassifyCode)
          )
        ),
        concatMap((activeClassifyCode) =>
          this.idbService
            .getAccumulatorRecords()
            .pipe(
              map((accumulatorRecords) =>
                accumulatorRecords
                  .filter(
                    (record) => record.classifyCode === activeClassifyCode
                  )
                  .reverse()
              )
            )
        ),
        tap((accumulatorRecords) => this.records$.next(accumulatorRecords)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addRecord(record: Omit<AccumulatorRecord, 'classifyCode'>) {
    const classifyCode = this.activeClassifyCode$.getValue();
    const result = { ...record, classifyCode };
    const total = this.total$.getValue() + parseFloat(record.number);
    this.total$.next(total);
    forkJoin([
      this.idbService.addAccumulatorRecord(result),
      this.idbService.changeTotalByClassifyCode(classifyCode, total),
    ]).subscribe({
      next: ([id]) => {
        result.id = id;
        this.records$.next([result, ...this.records$.getValue()]);
      },
    });
  }

  deleteSelectedRecords() {
    const selectedItems = this.selectedItems$.getValue();
    const selectedItemSet = new Set(selectedItems);
    this.records$.next(
      this.records$.getValue().filter((record) => !selectedItemSet.has(record))
    );
    const classifyCode = this.activeClassifyCode$.getValue();
    const total =
      this.total$.getValue() -
      selectedItems.reduce((acc, { number }) => acc + parseFloat(number), 0);
    this.total$.next(total);
    forkJoin([
      ...selectedItems.map((record) =>
        this.idbService.removeAccumulatorRecord(record.id)
      ),
      this.idbService.changeTotalByClassifyCode(classifyCode, total),
    ]).subscribe({
      next: () => {
        this.selectedItems$.next([]);
      },
    });
  }

  addClassify() {
    const classifyCode = uuid();
    const classify = { label: '新分類', classifyCode };
    this.idbService.addClassify(classify).subscribe({
      next: (id) => {
        this.classifies$.next([
          ...this.classifies$.getValue(),
          { ...classify, id },
        ]);
      },
    });
  }

  updateClassify(classify: Classify) {
    this.idbService.updateClassify(classify).subscribe({
      next: (updateId) => {
        const classifies = [...this.classifies$.getValue()];
        const targetIndex = classifies.findIndex(({ id }) => id === updateId);
        classifies.splice(targetIndex, 1, classify);
        this.classifies$.next(classifies);
      },
    });
  }

  changeActiveClassify(classify: Classify) {
    const { classifyCode } = classify;
    forkJoin([
      this.idbService.changeActiveClassify(classifyCode),
      this.idbService.getTotalByClassifyCode(classifyCode),
      this.idbService.getAccumulatorRecords(),
    ]).subscribe({
      next: ([, total, accumulatorRecords]) => {
        this.activeClassifyCode$.next(classifyCode);
        this.total$.next(total ?? 0);

        const records = accumulatorRecords
          .filter((record) => record.classifyCode === classifyCode)
          .reverse();
        this.records$.next(records);
      },
    });
  }
}
