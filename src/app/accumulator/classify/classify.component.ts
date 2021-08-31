import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Classify } from '../model/classify.model';

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassifyComponent {
  @Input() activeClassify?: Classify | null;
  @Input() classifies: Classify[] | null = [];

  isOpen = false;

  constructor() {}

  overlayOutsideClick(event: MouseEvent, classifyButton: MatButton) {
    const target = event.target as HTMLElement;
    if (classifyButton._elementRef.nativeElement.contains(target)) {
      return;
    }

    this.isOpen = false;
  }

  overlayDetach() {
    this.isOpen = false;
  }
}
