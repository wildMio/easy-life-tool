import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ExistModule } from '../pipe/exist/exist.module';
import { AccumulatorRoutingModule } from './accumulator-routing.module';
import { AccumulatorComponent } from './accumulator.component';
import { AdderComponent } from './adder/adder.component';
import { ClassifyComponent } from './classify/classify.component';
import { ValueGetterPipe } from './table/pipe/value-getter.pipe';
import { TableComponent } from './table/table.component';
import { TunerComponent } from './tuner/tuner.component';
import { ClassifyEditStatePipe } from './classify/classify-edit-state.pipe';

@NgModule({
  declarations: [
    AccumulatorComponent,
    AdderComponent,
    ClassifyComponent,
    TunerComponent,
    TableComponent,
    ValueGetterPipe,
    ClassifyEditStatePipe,
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
