import { Inject, Injectable } from '@angular/core';
import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { from, Observable, of } from 'rxjs';
import { concatMap, retry, shareReplay } from 'rxjs/operators';
import { IDB_VERSION_TOKEN } from 'src/app/service/idb-version.token';
import { Classify } from '../model/classify.model';
import { AccumulatorRecord } from '../model/record.model';

export interface AccumulatorDB extends DBSchema {
  'active-classify': {
    key: string;
    value: string;
  };

  'total-by-classify-code': {
    key: string;
    value: number;
  };

  classifies: {
    value: Classify;
    key: string;
    indexes: { 'by-id': string };
  };

  accumulators: {
    value: AccumulatorRecord;
    key: string;
    indexes: { 'by-date': string };
  };
}

@Injectable({
  providedIn: 'root',
})
export class AccumulatorIdbService {
  accumulatorDB$ = from(
    openDB<AccumulatorDB>('accumulator', this.idbVersion, {
      upgrade: (db) => {
        db.createObjectStore('active-classify');

        db.createObjectStore('total-by-classify-code');

        const classifyStore = db.createObjectStore('classifies', {
          keyPath: 'id',
          autoIncrement: true,
        });
        classifyStore.createIndex('by-id', 'id');

        const accumulatorStore = db.createObjectStore('accumulators', {
          keyPath: 'id',
          autoIncrement: true,
        });
        accumulatorStore.createIndex('by-date', 'createdDate');
      },
    })
  ).pipe(shareReplay(1));

  constructor(@Inject(IDB_VERSION_TOKEN) private readonly idbVersion: number) {}

  private wrapAction<T extends Promise<any>>(
    action: (db: IDBPDatabase<AccumulatorDB>) => T
  ) {
    return this.accumulatorDB$.pipe(concatMap((db) => from(action(db))));
  }

  getActiveClassifyCode() {
    return this.wrapAction((db) => db.get('active-classify', 'code'));
  }

  changeActiveClassify(classifyCode: string) {
    return this.wrapAction((db) =>
      db.put('active-classify', classifyCode, 'code')
    );
  }

  getTotalByClassifyCode(classifyCode: string | undefined) {
    return classifyCode
      ? this.wrapAction((db) => db.get('total-by-classify-code', classifyCode))
      : of(0);
  }

  changeTotalByClassifyCode(classifyCode: string, total: number) {
    return this.wrapAction((db) =>
      db.put('total-by-classify-code', total, classifyCode)
    );
  }

  addClassify(classify: Classify) {
    return this.wrapAction((db) => db.add('classifies', classify));
  }

  getClassifies() {
    return this.wrapAction((db) => db.getAllFromIndex('classifies', 'by-id'));
  }

  addAccumulatorRecord(record: AccumulatorRecord) {
    return this.wrapAction((db) => db.add('accumulators', record));
  }

  removeAccumulatorRecord(recordId: string) {
    return this.wrapAction((db) => db.delete('accumulators', recordId));
  }

  getAccumulatorRecords() {
    return this.wrapAction((db) =>
      db.getAllFromIndex('accumulators', 'by-date')
    );
  }
}
