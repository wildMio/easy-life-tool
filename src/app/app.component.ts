import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(
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
}
