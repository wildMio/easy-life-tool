import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'accumulator',
    loadChildren: () =>
      import('./accumulator/accumulator.module').then(
        (m) => m.AccumulatorModule
      ),
  },
  {
    path: 'spreadsheet',
    loadChildren: () =>
      import('./spreadsheet/spreadsheet.module').then(
        (m) => m.SpreadsheetModule
      ),
  },
  {
    path: 'clock',
    loadChildren: () =>
      import('./clock/clock.module').then((m) => m.ClockModule),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
