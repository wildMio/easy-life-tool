import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Classify } from '../model/classify.model';

@Injectable()
export class ClassifyEditStateService {
  classifyEditState = new Map<Classify, boolean>();
  classifyEditState$ = new BehaviorSubject(this.classifyEditState);

  updateEditState(classify: Classify, edit: boolean) {
    this.classifyEditState.set(classify, edit);
    this.classifyEditState$.next(this.classifyEditState);
  }
}
