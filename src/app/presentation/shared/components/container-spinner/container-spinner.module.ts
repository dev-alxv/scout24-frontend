import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerSpinnerComponent } from './container-spinner.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialUiModule } from '../material/material-ui.module';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialUiModule
  ],
  declarations: [ContainerSpinnerComponent],
  exports: [ContainerSpinnerComponent]
})
export class ContainerSpinnerModule { }
