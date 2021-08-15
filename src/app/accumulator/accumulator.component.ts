import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { MatButton } from '@angular/material/button';

export type NumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;

export type OperatorType = 'add' | 'remove';

@Component({
  selector: 'app-accumulator',
  templateUrl: './accumulator.component.html',
  styleUrls: ['./accumulator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccumulatorComponent implements OnInit {
  total = 0;

  isOpen = false;

  records: { number: string }[] = [];

  numbers: NumberType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  currentValue: string | null = null;

  hasPoint = false;

  pointExponential = 1;

  operator: OperatorType = 'add';

  constructor() {}

  ngOnInit(): void {
    this.total = 1;
  }

  openOverlay(type: OperatorType) {
    this.isOpen = true;
    this.operator = type;
  }

  overlayOutsideClick(
    event: MouseEvent,
    addButton: MatButton,
    removeButton: MatButton
  ) {
    const target = event.target as HTMLElement;
    if (
      addButton._elementRef.nativeElement.contains(target) ||
      removeButton._elementRef.nativeElement.contains(target)
    ) {
      return;
    }

    this.isOpen = false;
  }

  overlayDetach() {
    this.isOpen = false;
    this.resetValue();
  }

  resetValue() {
    this.currentValue = null;
    this.hasPoint = false;
    this.pointExponential = 1;
  }

  addNumber(number: NumberType) {
    if (this.currentValue === null) {
      this.currentValue = String(number);
    } else if (this.pointExponential < 8) {
      this.currentValue += String(number);
      if (this.hasPoint) {
        this.pointExponential += 1;
      }
    }
  }

  addPoint() {
    if (!this.hasPoint) {
      if (this.currentValue === null) {
        this.currentValue = '0.';
      } else if (this.currentValue !== null) {
        this.currentValue += '.';
      }
      this.hasPoint = true;
    }
  }

  enterRecord() {
    if (this.currentValue) {
      this.records.push({ number: this.currentValue });
      this.resetValue();
    }
  }
}
