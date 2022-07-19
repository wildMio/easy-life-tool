import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomTitleStrategyService extends TitleStrategy {
  updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title) {
      this.title.setTitle(`Easy Life Tool - ${title}`);
    }
  }

  constructor(private readonly title: Title) {
    super();
  }
}
