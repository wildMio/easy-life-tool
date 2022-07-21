import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Action } from 'src/app/model/action';

export type SpreadsheetAddDialogResult = Action<string>;

@Component({
  selector: 'app-spreadsheet-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './spreadsheet-add-dialog.component.html',
  styleUrls: ['./spreadsheet-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpreadsheetAddDialogComponent {
  title = '';

  constructor(
    private readonly dialogRef: MatDialogRef<SpreadsheetAddDialogComponent>
  ) {}

  confirm() {
    this.dialogRef.close({ item: this.title, action: 'add' });
  }
}
