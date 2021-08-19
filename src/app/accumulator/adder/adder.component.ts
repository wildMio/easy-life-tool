import { ConnectedPosition } from '@angular/cdk/overlay';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AccumulatorRecord } from '../model/record.model';

export type NumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;

export type OperatorType = 'add' | 'remove';

@Component({
  selector: 'app-adder',
  templateUrl: './adder.component.html',
  styleUrls: ['./adder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdderComponent {
  isOpen = false;

  detailIsOpen = false;

  numbers: NumberType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  whiteListMap = [
    ...this.numbers,
    '.',
    'Delete',
    'Backspace',
    'ArrowLeft',
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'Tab',
  ].reduce((map, num) => ({ ...map, [num]: true }), {}) as {
    [num: string]: true;
  };

  currentValue: string | null = null;

  hasPoint = false;

  pointExponential = 1;

  pointRegExp = /\./;

  operator: OperatorType = 'add';

  connectedPositions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
    },
  ];

  @Output() add = new EventEmitter<AccumulatorRecord>();

  constructor() {}

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

  inputKeydown(event: KeyboardEvent) {
    const { key } = event;
    console.log(key);
    if (!this.whiteListMap[key] || (this.hasPoint && key === '.')) {
      event.preventDefault();
    }
    if (key === 'Enter') {
      this.enterRecord();
    }
  }

  inputValue(event: InputEvent, value: string) {
    console.log(value);
    let result = value;
    const { data } = event;
    if (data === '.' || this.hasPoint) {
      const [beforePoint, afterPoint] = value.split('.');
      const shrinkAfterPoint = afterPoint.slice(0, 8);
      this.hasPoint = true;
      this.pointExponential = shrinkAfterPoint.length + 1;
      result = `${beforePoint || '0'}.${shrinkAfterPoint}`;
    }
    if (data === null && this.hasPoint && !this.pointRegExp.test(result)) {
      this.hasPoint = false;
      this.pointExponential = 1;
    }
    this.currentValue = result;
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
      this.add.emit({
        number: this.currentValue,
        createdDate: new Date().toISOString(),
      });
      this.resetValue();
    }
  }

  toggleDetail(isOpen: boolean) {
    this.detailIsOpen = isOpen;
  }
}
