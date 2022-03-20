import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';

import { BehaviorSubject, map } from 'rxjs';

import { Classify } from '../model/classify.model';
import { InputToSubject } from 'src/app/util/input-to-subject';

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassifyComponent {
  @Input() activeClassify?: Classify | null;

  classifies$ = new BehaviorSubject<Classify[]>([]);
  @InputToSubject()
  @Input()
  classifies: Classify[] | null = [];

  isOpen = false;

  filterOn$ = new BehaviorSubject(true);
  filterIcon$ = this.filterOn$.pipe(
    map((on) => (on ? 'filter_list' : 'filter_list_off'))
  );

  toggleFilter() {
    this.filterOn$.next(!this.filterOn$.getValue());
  }

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
