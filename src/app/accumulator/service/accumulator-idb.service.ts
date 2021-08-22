import { Inject, Injectable } from '@angular/core';
import { IDB_VERSION_TOKEN } from 'src/app/service/idb-version.token';

@Injectable({
  providedIn: 'root',
})
export class AccumulatorIdbService {
  constructor(@Inject(IDB_VERSION_TOKEN) private readonly idbVersion: number) {}
}
