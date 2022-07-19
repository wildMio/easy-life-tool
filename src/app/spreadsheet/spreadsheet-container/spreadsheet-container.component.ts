import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { SpreadsheetClassify } from '../model/spreadsheet-classify';
import { SpreadsheetDeleteDialogComponent } from '../spreadsheet-delete-dialog/spreadsheet-delete-dialog.component';

@Component({
  selector: 'app-spreadsheet-container',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    SpreadsheetDeleteDialogComponent,
  ],
  templateUrl: './spreadsheet-container.component.html',
  styleUrls: ['./spreadsheet-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpreadsheetContainerComponent {
  @HostBinding('class') class = 'grid grid-rows-[auto_1fr]';

  classifies: SpreadsheetClassify[] = [
    { id: '1', title: 'first', updateTime: new Date() },
  ];

  constructor(private readonly dialog: MatDialog) {}

  confirmDelete(classify: SpreadsheetClassify) {
    this.dialog.open(SpreadsheetDeleteDialogComponent, {
      backdropClass: 'slightly-backdrop',
      data: classify,
    });
  }
}
