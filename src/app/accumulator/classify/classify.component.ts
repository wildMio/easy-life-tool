import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatButton } from '@angular/material/button';

import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  startWith,
} from 'rxjs';

import { Classify } from '../model/classify.model';
import { ClassifyEditStateService } from './classify-edit-state.service';
import { InputToSubject } from 'src/app/util/input-to-subject';

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassifyEditStateService],
})
export class ClassifyComponent {
  filterText$ = new BehaviorSubject('');

  activeClassify$ = new BehaviorSubject<Classify | null>(null);
  @InputToSubject()
  @Input()
  activeClassify?: Classify | null;

  classifies$ = new BehaviorSubject<Classify[]>([]);
  @InputToSubject()
  @Input()
  classifies: Classify[] | null = [];

  candidateClassifies$ = combineLatest([
    this.activeClassify$,
    this.classifies$,
    this.filterText$.pipe(
      debounceTime(300),
      startWith(this.filterText$.getValue())
    ),
  ]).pipe(
    map(([activeClassify, classifies, filterText]) => {
      const result = classifies.filter(
        (classify) => classify !== activeClassify
      );
      const lowerText = filterText.toLowerCase();
      return filterText === ''
        ? result
        : result.filter((classify) =>
            classify.label.toLowerCase().includes(lowerText)
          );
    })
  );

  isOpen = false;

  filterOn$ = new BehaviorSubject(true);
  filterIcon$ = this.filterOn$.pipe(
    map((on) => (on ? 'filter_list' : 'filter_list_off'))
  );

  @Output() addClassify = new EventEmitter<void>();
  @Output() updateClassify = new EventEmitter<Classify>();
  @Output() changeActiveClassify = new EventEmitter<Classify>();

  constructor(private classifyEditStateService: ClassifyEditStateService) {}

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

  updateFilterCondition(event: Event) {
    const target = event.target as HTMLInputElement;
    this.filterText$.next(target.value);
  }

  changeToEditState(classify: Classify) {
    this.classifyEditStateService.updateEditState(classify, true);
  }

  updateClassifyLabel(classify: Classify, value: string) {
    this.updateClassify.emit({ ...classify, label: value });
  }
}
