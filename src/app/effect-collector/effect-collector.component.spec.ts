import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectCollectorComponent } from './effect-collector.component';

describe('EffectCollectorComponent', () => {
  let component: EffectCollectorComponent;
  let fixture: ComponentFixture<EffectCollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EffectCollectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EffectCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
