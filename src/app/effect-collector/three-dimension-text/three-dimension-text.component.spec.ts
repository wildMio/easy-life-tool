import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDimensionTextComponent } from './three-dimension-text.component';

describe('ThreeDimensionTextComponent', () => {
  let component: ThreeDimensionTextComponent;
  let fixture: ComponentFixture<ThreeDimensionTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ThreeDimensionTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDimensionTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
