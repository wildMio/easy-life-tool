import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccumulatorRoutingModule } from './accumulator-routing.module';
import { AccumulatorComponent } from './accumulator.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [AccumulatorComponent],
  imports: [
    CommonModule,
    AccumulatorRoutingModule,
    MatButtonModule,
    MatIconModule,
    OverlayModule,
    ScrollingModule,
    A11yModule,
  ],
})
export class AccumulatorModule {}
