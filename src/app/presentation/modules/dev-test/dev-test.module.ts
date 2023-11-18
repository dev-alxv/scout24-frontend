import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevTestComponent } from './dev-test.component';
import { DevTestService } from './dev-test.service';



@NgModule({
  declarations: [DevTestComponent],
  imports: [
    CommonModule
  ],
  providers: [
    DevTestService
  ]
})
export class DevTestModule { }
