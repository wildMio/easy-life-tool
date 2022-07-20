import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';

import { BehaviorSubject, combineLatest, filter, map } from 'rxjs';

import { AppPwaService } from './service/app-pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'easy-life-tool';

  showInstallPromotion$ = this.appPwaService.showInstallPromotion$;

  swUpdateAvailable$ = this.swUpdate.versionUpdates.pipe(
    filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
    map((evt) => ({
      type: 'UPDATE_AVAILABLE',
      current: evt.currentVersion,
      available: evt.latestVersion,
    }))
  );

  dismissUpdate$ = new BehaviorSubject(false);

  showUpdatePanel$ = combineLatest([
    this.swUpdateAvailable$,
    this.dismissUpdate$,
  ]).pipe(map(([updateAvailable, dismiss]) => updateAvailable && !dismiss));

  loadModuleIndicator$ = this.router.events.pipe(
    filter(
      (event) =>
        event instanceof RouteConfigLoadStart ||
        event instanceof RouteConfigLoadEnd
    ),
    map((event) => event instanceof RouteConfigLoadStart)
  );

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly swUpdate: SwUpdate,
    private readonly router: Router,
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private readonly appPwaService: AppPwaService
  ) {}

  ngOnInit() {
    this.matIconRegistry.addSvgIconResolver((name, namespace) => {
      return namespace === ''
        ? this.domSanitizer.bypassSecurityTrustResourceUrl(
            `/assets/img/svg/${name}.svg`
          )
        : null;
    });

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
}
