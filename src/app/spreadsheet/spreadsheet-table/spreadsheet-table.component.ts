import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-spreadsheet-table',
  templateUrl: './spreadsheet-table.component.html',
  styleUrls: ['./spreadsheet-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpreadsheetTableComponent {
  @Input() columnDefs: ColDef[] = [];

  @Input() rowData?: Record<string, any>[];

  @Output() gridReady = new EventEmitter<GridReadyEvent>();

  defaultColDef: ColDef = {
    resizable: true,
    editable: true,
    sortable: true,
    filter: true,
  };

  gridApi?: GridApi;
  columnApi?: ColumnApi;

  ready(gridReady: GridReadyEvent) {
    const { api, columnApi } = gridReady;
    this.gridApi = api;
    this.columnApi = columnApi;
    this.gridReady.emit(gridReady);
  }
}
