import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AgGridModule } from 'ag-grid-angular';

import { SpreadsheetRoutingModule } from './spreadsheet-routing.module';
import { SpreadsheetTableComponent } from './spreadsheet-table/spreadsheet-table.component';
import { SpreadsheetComponent } from './spreadsheet.component';

@NgModule({
  declarations: [SpreadsheetComponent, SpreadsheetTableComponent],
  imports: [
    CommonModule,
    SpreadsheetRoutingModule,
    AgGridModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SpreadsheetModule {}
