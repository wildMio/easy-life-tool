import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClockRoutingModule } from './clock-routing.module';
import { ClockComponent } from './clock.component';

@NgModule({
  declarations: [ClockComponent],
  imports: [CommonModule, ClockRoutingModule],
})
export class ClockModule {}
