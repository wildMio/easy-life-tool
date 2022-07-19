import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpreadsheetTitleResolverService } from './service/spreadsheet-title-resolver.service';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./spreadsheet-container/spreadsheet-container.component').then(
        (c) => c.SpreadsheetContainerComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./spreadsheet/spreadsheet.component').then(
        (c) => c.SpreadsheetComponent
      ),
    title: SpreadsheetTitleResolverService,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpreadsheetRoutingModule {}
