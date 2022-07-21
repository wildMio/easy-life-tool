import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { BehaviorSubject, combineLatest, map } from 'rxjs';

import { SpreadsheetClassify } from '../model/spreadsheet-classify';
import {
  SpreadsheetAddDialogComponent,
  SpreadsheetAddDialogResult,
} from '../spreadsheet-add-dialog/spreadsheet-add-dialog.component';
import {
  SpreadsheetDeleteDialogComponent,
  SpreadsheetDeleteDialogResult,
} from '../spreadsheet-delete-dialog/spreadsheet-delete-dialog.component';

export type SortingType = 'updateTime' | 'title';

export type Sorting = 'asc' | 'desc';

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
    MatButtonToggleModule,
  ],
  templateUrl: './spreadsheet-container.component.html',
  styleUrls: ['./spreadsheet-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpreadsheetContainerComponent {
  @HostBinding('class') class = 'grid grid-rows-[auto_auto_1fr] gap-1';

  classifies$ = new BehaviorSubject<SpreadsheetClassify[]>([
    {
      id: '1',
      title: 'first',
      updateTime: new Date(),
      updateMillisecond: `${new Date().getTime()}`,
    },
    {
      id: '2',
      title: 'second',
      updateTime: new Date(1658324370459),
      updateMillisecond: `${1658324370459}`,
    },
    {
      id: '3',
      title: 'third',
      updateTime: new Date(1658324379459),
      updateMillisecond: `${1658324379459}`,
    },
  ]);

  sortingType$ = new BehaviorSubject<SortingType>('updateTime');
  sorting$ = new BehaviorSubject<Sorting>('asc');

  sortingTooltip: { [key in SortingType]: { asc: string; desc: string } } = {
    updateTime: { asc: '新到舊', desc: '舊到新' },
    title: { asc: 'A 到 Z', desc: 'Z 到 A' },
  };
  sortingAscTooltip$ = this.sortingType$.pipe(
    map((sortingType) => this.sortingTooltip[sortingType].asc)
  );
  sortingDescTooltip$ = this.sortingType$.pipe(
    map((sortingType) => this.sortingTooltip[sortingType].desc)
  );

  collator = new Intl.Collator();

  displayClassifies$ = combineLatest([
    this.sortingType$,
    this.sorting$,
    this.classifies$,
  ]).pipe(
    map(([sortingType, sorting, classifies]) => {
      const collator = new Intl.Collator();
      const strategy =
        sortingType === 'title'
          ? (a: SpreadsheetClassify, b: SpreadsheetClassify) =>
              collator.compare(a.title, b.title)
          : (a: SpreadsheetClassify, b: SpreadsheetClassify) =>
              this.collator.compare(b.updateMillisecond, a.updateMillisecond);
      const direct = (classifies: SpreadsheetClassify[]) =>
        sorting === 'asc' ? classifies : classifies.reverse();
      return direct([...classifies].sort(strategy));
    })
  );

  constructor(private readonly dialog: MatDialog) {}

  confirmDelete(classify: SpreadsheetClassify) {
    const dialogRef = this.dialog.open<
      SpreadsheetDeleteDialogComponent,
      SpreadsheetClassify,
      SpreadsheetDeleteDialogResult
    >(SpreadsheetDeleteDialogComponent, {
      backdropClass: 'slightly-backdrop',
      data: classify,
    });
    dialogRef.beforeClosed().subscribe(console.log);
  }

  confirmAdd() {
    const dialogRef = this.dialog.open<
      SpreadsheetAddDialogComponent,
      any,
      SpreadsheetAddDialogResult
    >(SpreadsheetAddDialogComponent, {
      backdropClass: 'slightly-backdrop',
    });

    dialogRef.beforeClosed().subscribe(console.log);
  }
}
