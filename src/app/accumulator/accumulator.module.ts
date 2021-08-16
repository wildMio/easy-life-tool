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

@NgModule({
  declarations: [AccumulatorComponent, AdderComponent],
  imports: [
    CommonModule,
    AccumulatorRoutingModule,
    MatButtonModule,
    MatIconModule,
    OverlayModule,
    ScrollingModule,
    A11yModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AccumulatorModule {}
