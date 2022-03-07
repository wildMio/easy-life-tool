import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccumulatorRoutingModule } from './accumulator-routing.module';
import { AccumulatorComponent } from './accumulator.component';
import { AdderComponent } from './adder/adder.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { A11yModule } from '@angular/cdk/a11y';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClassifyComponent } from './classify/classify.component';
import { TunerComponent } from './tuner/tuner.component';
import { TableComponent } from './table/table.component';
import { ValueGetterPipe } from './table/pipe/value-getter.pipe';
import { ExistModule } from '../pipe/exist/exist.module';

@NgModule({
  declarations: [
    AccumulatorComponent,
    AdderComponent,
    ClassifyComponent,
    TunerComponent,
    TableComponent,
    ValueGetterPipe,
  ],
  imports: [
    CommonModule,
    AccumulatorRoutingModule,
    MatButtonModule,
    MatIconModule,
    OverlayModule,
    ScrollingModule,
    A11yModule,
    DragDropModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ExistModule,
  ],
})
export class AccumulatorModule {}
