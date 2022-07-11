import { DOCUMENT } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  VERSION,
} from '@angular/core';

import {
  BehaviorSubject,
  map,
  Observable,
  Subject,
  distinctUntilChanged,
  switchMap,
  merge,
  from,
  fromEvent,
  filter,
  of,
  tap,
  catchError,
} from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockComponent implements OnInit {
  numbers = Array.from({ length: 12 }).map((_, index) => ({
    index: index === 0 ? 12 : index,
    rotate: `${(360 / 12) * index}deg`,
    labelRotate: `${360 - (360 / 12) * index}deg`,
  }));

  steps = Array.from({ length: 60 }).map((_, index) => ({
    index,
    rotate: `${(360 / 60) * index}deg`,
    hidden: index % 5 === 0,
  }));

  now$ = new BehaviorSubject(new Date());

  hour$ = this.now$.pipe(map((date) => date.getHours()));
  minute$ = this.now$.pipe(
    map((date) => `${date.getMinutes()}`.padStart(2, '0'))
  );
  second$ = this.now$.pipe(
    map((date) => `${date.getSeconds()}`.padStart(2, '0'))
  );

  hourDeg$ = this.now$.pipe(
    map((date) => {
      const hourOffset = (360 / 12) * (date.getHours() % 12);
      const minuteOffset = (360 / 12 / 60) * date.getMinutes();
      const secondOffset = (360 / 12 / 60 / 60) * date.getSeconds();
      return `${(hourOffset + minuteOffset + secondOffset).toFixed(1)}deg`;
    })
  );

  minuteDeg$ = this.now$.pipe(
    map((date) => {
      const minuteOffset = (360 / 60) * date.getMinutes();
      const secondOffset = (360 / 60 / 60) * date.getSeconds();
      return `${(minuteOffset + secondOffset).toFixed(0)}deg`;
    })
  );

  secondDeg$ = this.now$.pipe(
    map((date) => {
      const secondOffset = (360 / 60) * date.getSeconds();
      return `${secondOffset}deg`;
    })
  );

  wakable$ = new Observable((subscriber) => {
    const exist = 'wakeLock' in navigator;
    subscriber.next(exist);
    return () => subscriber.complete();
  });

  lock$ = new BehaviorSubject(false);

  wakeLockError$ = new Subject<string>();
  wakeLock: any;
  wakeLock$ = this.lock$.pipe(
    distinctUntilChanged(),
    switchMap((lock) =>
      lock
        ? merge(
            from((navigator as any).wakeLock.request('screen')),
            fromEvent(this.document, 'visibilitychange').pipe(
              filter(() => this.document.visibilityState === 'visible'),
              switchMap(() =>
                from((navigator as any).wakeLock.request('screen'))
              )
            )
          )
        : of(null)
    ),
    tap((wakeLock) => (this.wakeLock = wakeLock)),
    catchError((err) => {
      this.wakeLockError$.next(`${err.name}, ${err.message}`);
      return of(null);
    })
  );

  releasing = false;

  name = 'Angular ' + VERSION.major;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  ngOnInit() {
    this.animationInterval(1000, new AbortController().signal, () =>
      this.now$.next(new Date())
    );
  }

  animationInterval(
    ms: number,
    signal?: AbortSignal,
    callback?: (...args: any[]) => any
  ) {
    // Prefer currentTime, as it'll better sync animtions queued in the
    // same frame, but if it isn't supported, performance.now() is fine.
    const start = this.document.timeline
      ? this.document.timeline.currentTime ?? performance.now()
      : performance.now();

    function frame(time: number) {
      if (signal?.aborted) return;
      callback?.(time);
      scheduleFrame(time);
    }

    function scheduleFrame(time: number) {
      const elapsed = time - start;
      const roundedElapsed = Math.round(elapsed / ms) * ms;
      const targetNext = start + roundedElapsed + ms;
      const delay = targetNext - performance.now();
      setTimeout(() => requestAnimationFrame(frame), delay);
    }

    scheduleFrame(start);
  }

  lockScreen() {
    this.lock$.next(true);
  }

  releaseWakeLock() {
    if (this.releasing) {
      return;
    }

    this.releasing = true;
    this.wakeLock.release().then(() => {
      this.releasing = false;
      this.lock$.next(false);
    });
  }
}
