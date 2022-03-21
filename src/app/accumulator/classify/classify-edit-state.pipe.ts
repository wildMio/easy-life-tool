import { Pipe, PipeTransform } from '@angular/core';

import { distinctUntilChanged, map, Observable } from 'rxjs';

import { Classify } from '../model/classify.model';
import { ClassifyEditStateService } from './classify-edit-state.service';

@Pipe({
  name: 'classifyEditState',
})
export class ClassifyEditStatePipe implements PipeTransform {
  constructor(private classifyEditStateService: ClassifyEditStateService) {}

  transform(classify: Classify): Observable<boolean> {
    return this.classifyEditStateService.classifyEditState$.pipe(
      map((state) => !!state.get(classify)),
      distinctUntilChanged()
    );
  }
}
