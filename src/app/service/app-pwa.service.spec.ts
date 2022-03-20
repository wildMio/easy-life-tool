import { TestBed } from '@angular/core/testing';

import { AppPwaService } from './app-pwa.service';

describe('AppPwaService', () => {
  let service: AppPwaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppPwaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
