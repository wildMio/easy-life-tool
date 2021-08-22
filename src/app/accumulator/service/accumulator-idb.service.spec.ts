import { TestBed } from '@angular/core/testing';

import { AccumulatorIdbService } from './accumulator-idb.service';

describe('AccumulatorIdbService', () => {
  let service: AccumulatorIdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccumulatorIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
