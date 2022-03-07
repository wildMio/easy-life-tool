import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exist',
})
export class ExistPipe implements PipeTransform {
  transform<T>(options: Set<T> | null, target: T): boolean {
    return !!options && options.has(target);
  }
}
