import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { VersionReadyEvent, SwUpdate } from '@angular/service-worker';

import { filter, map, BehaviorSubject, combineLatest, startWith } from 'rxjs';

import { AppPwaService } from '../service/app-pwa.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolBarComponent implements OnInit {
  showInstallPromotion$ = this.appPwaService.showInstallPromotion$;

  swUpdateAvailable$ = this.swUpdate.versionUpdates.pipe(
    filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
    map((evt) => ({
      type: 'UPDATE_AVAILABLE',
      current: evt.currentVersion,
      available: evt.latestVersion,
    }))
  );

  hasPWAHint$ = combineLatest([
    this.showInstallPromotion$,
    this.swUpdateAvailable$.pipe(startWith(false)),
  ]).pipe(map((shows) => shows.some((show) => show)));

  dismissUpdate$ = new BehaviorSubject(false);

  showUpdatePanel$ = combineLatest([
    this.swUpdateAvailable$,
    this.dismissUpdate$,
  ]).pipe(map(([updateAvailable, dismiss]) => updateAvailable && !dismiss));

  toolOpened = false;
  controlTabindex = -1;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly swUpdate: SwUpdate,
    private readonly router: Router,
    private readonly appPwaService: AppPwaService
  ) {}

  ngOnInit(): void {
    this.appPwaService.interceptDefaultInstall();
  }

  installPromotion() {
    this.appPwaService.installPromotion();
  }

  reloadPage() {
    this.swUpdate.activateUpdate().then(() => this.document.location.reload());
  }

  dismissUpdate() {
    this.dismissUpdate$.next(true);
  }

  toggleTool() {
    this.toolOpened = !this.toolOpened;
    this.controlTabindex = this.toolOpened ? 0 : -1;
  }
}
