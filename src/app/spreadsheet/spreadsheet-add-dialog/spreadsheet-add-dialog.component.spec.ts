import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsheetAddDialogComponent } from './spreadsheet-add-dialog.component';

describe('SpreadsheetAddDialogComponent', () => {
  let component: SpreadsheetAddDialogComponent;
  let fixture: ComponentFixture<SpreadsheetAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SpreadsheetAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpreadsheetAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
