import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpreadsheetComponent } from './spreadsheet.component';

const routes: Routes = [{ path: '', component: SpreadsheetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpreadsheetRoutingModule {}
