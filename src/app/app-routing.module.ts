import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      title: '導覽'
  },
  {
    path: 'accumulator',
    loadChildren: () =>
      import('./accumulator/accumulator.module').then(
        (m) => m.AccumulatorModule
      ),
      title: '累加器',
  },
  {
    path: 'spreadsheet',
    loadChildren: () =>
      import('./spreadsheet/spreadsheet.module').then(
        (m) => m.SpreadsheetModule
      ),
      title: '表單',
  },
  {
    path: 'clock',
    loadChildren: () =>
      import('./clock/clock.module').then((m) => m.ClockModule),
      title: '時鐘',
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
