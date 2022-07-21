import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { ThreeDimensionTextComponent } from './three-dimension-text/three-dimension-text.component';

@Component({
  selector: 'app-effect-collector',
  standalone: true,
  imports: [CommonModule, ThreeDimensionTextComponent],
  templateUrl: './effect-collector.component.html',
  styleUrls: ['./effect-collector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EffectCollectorComponent {
  @HostBinding('class') class =
    'grid gap-4 p-8 overflow-auto justify-center h-full';
}
