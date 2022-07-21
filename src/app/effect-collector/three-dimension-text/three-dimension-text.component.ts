import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-three-dimension-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './three-dimension-text.component.html',
  styleUrls: ['./three-dimension-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreeDimensionTextComponent {
  @HostBinding('class') class =
    'flex justify-center items-center h-full relative';

  items = Array.from({ length: 24 }).map((_, index) => ({
    offset: index,
  }));
}
