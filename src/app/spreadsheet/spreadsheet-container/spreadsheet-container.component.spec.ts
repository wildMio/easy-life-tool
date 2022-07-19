import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsheetContainerComponent } from './spreadsheet-container.component';

describe('SpreadsheetContainerComponent', () => {
  let component: SpreadsheetContainerComponent;
  let fixture: ComponentFixture<SpreadsheetContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SpreadsheetContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpreadsheetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
