import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  // RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpreadsheetTitleResolverService implements Resolve<string> {
  resolve(
    route: ActivatedRouteSnapshot
    // state: RouterStateSnapshot
  ): string | Observable<string> | Promise<string> {
    return `列表 - ${route.paramMap.get('id')}`;
  }
}
