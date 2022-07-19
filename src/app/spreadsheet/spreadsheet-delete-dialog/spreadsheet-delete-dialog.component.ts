import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { SpreadsheetClassify } from '../model/spreadsheet-classify';

@Component({
  selector: 'app-spreadsheet-delete-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    A11yModule,
  ],
  templateUrl: './spreadsheet-delete-dialog.component.html',
  styleUrls: ['./spreadsheet-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpreadsheetDeleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: SpreadsheetClassify
  ) {}
}
