import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';

import { SpreadsheetTableComponent } from '../spreadsheet-table/spreadsheet-table.component';

@Component({
  selector: 'app-spreadsheet',
  standalone: true,
  imports: [
    CommonModule,
    AgGridModule,
    MatButtonModule,
    MatIconModule,
    SpreadsheetTableComponent,
  ],
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpreadsheetComponent {
  @HostBinding('class') class = 'grid h-full grid-rows-[auto_1fr]';

  columnDefs: ColDef[] = [
    {
      rowDrag: true,
      width: 50,
      filter: false,
      sortable: false,
      editable: false,
      resizable: false,
      pinned: 'left',
      lockPosition: true,
    },
    {
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 50,
      filter: false,
      sortable: false,
      editable: false,
      resizable: false,
      pinned: 'left',
      lockPosition: true,
    },
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ];

  rowData: any[] = [];

  gridApi?: GridApi;
  columnApi?: ColumnApi;

  newRow() {
    this.rowData = [...this.rowData, {}];
  }

  removeSelectedRow() {
    const selectedRows = new Set(this.gridApi?.getSelectedRows());
    this.rowData = this.rowData.filter((row) => !selectedRows.has(row));
  }

  gridReady(gridReady: GridReadyEvent) {
    const { api, columnApi } = gridReady;
    this.gridApi = api;
    this.columnApi = columnApi;
  }
}
