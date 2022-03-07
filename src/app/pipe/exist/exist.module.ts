import { NgModule } from '@angular/core';
import { ExistPipe } from './exist.pipe';

@NgModule({
  declarations: [ExistPipe],
  exports: [ExistPipe],
})
export class ExistModule {}
