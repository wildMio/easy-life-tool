import { TestBed } from '@angular/core/testing';

import { SpreadsheetTitleResolverService } from './spreadsheet-title-resolver.service';

describe('SpreadsheetTitleResolverService', () => {
  let service: SpreadsheetTitleResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpreadsheetTitleResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
