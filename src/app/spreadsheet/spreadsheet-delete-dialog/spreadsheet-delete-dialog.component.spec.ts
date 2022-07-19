import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsheetDeleteDialogComponent } from './spreadsheet-delete-dialog.component';

describe('SpreadsheetDeleteDialogComponent', () => {
  let component: SpreadsheetDeleteDialogComponent;
  let fixture: ComponentFixture<SpreadsheetDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SpreadsheetDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpreadsheetDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
