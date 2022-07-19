import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomTitleStrategyService } from './service/custom-title-strategy.service';
import { IDB_VERSION_TOKEN } from './service/idb-version.token';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    { provide: IDB_VERSION_TOKEN, useValue: 1 },
    { provide: TitleStrategy, useClass: CustomTitleStrategyService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
