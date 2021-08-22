import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Column } from '../model/column';

@Component({
  selector: 'app-tuner',
  templateUrl: './tuner.component.html',
  styleUrls: ['./tuner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TunerComponent {
  isOpen = false;

  @Input() columns: Column[] = [];

  @Output() columnsChange = new EventEmitter<Column[]>();

  constructor() {}

  overlayOutsideClick(event: MouseEvent, tuneButton: MatButton) {
    const target = event.target as HTMLElement;
    if (tuneButton._elementRef.nativeElement.contains(target)) {
      return;
    }

    this.isOpen = false;
  }

  overlayDetach() {
    this.isOpen = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    const result = [...this.columns];
    moveItemInArray(result, event.previousIndex, event.currentIndex);
    this.columnsChange.emit(result);
  }

  changeVisible({ checked }: MatCheckboxChange, column: Column) {
    const index = this.columns.findIndex((col) => col === column);
    const result = [...this.columns];
    result[index] = { ...this.columns[index], visible: checked };
    this.columnsChange.emit(result);
  }
}
