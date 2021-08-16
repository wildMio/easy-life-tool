import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AccumulatorRecord } from './model/record.model';

@Component({
  selector: 'app-accumulator',
  templateUrl: './accumulator.component.html',
  styleUrls: ['./accumulator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccumulatorComponent implements OnInit {
  total = 0;

  records: AccumulatorRecord[] = [];

  constructor() {}

  ngOnInit(): void {
    this.total = 1;
  }
}
