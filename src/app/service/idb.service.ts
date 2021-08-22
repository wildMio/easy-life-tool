import { Inject, Injectable } from '@angular/core';
import { DBSchema, IDBPDatabase, openDB, StoreNames } from 'idb';
import { from, Observable } from 'rxjs';
import { IDB_VERSION_TOKEN } from './idb-version.token';

@Injectable({
  providedIn: 'root',
})
export class IdbService {
  constructor(@Inject(IDB_VERSION_TOKEN) private readonly idbVersion: number) {}

  openDb$<T>(
    name: string,
    storeName: StoreNames<T>
  ): Observable<IDBPDatabase<T>> {
    return from(
      openDB<T>(name, this.idbVersion, {
        upgrade: (db): void => {
          db.createObjectStore(storeName);
        },
      })
    );
  }

  // add$()
}
