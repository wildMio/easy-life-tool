import { TestBed } from '@angular/core/testing';

import { ClassifyEditStateService } from './classify-edit-state.service';

describe('ClassifyEditStateService', () => {
  let service: ClassifyEditStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassifyEditStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
