import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-spreadsheet',
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
