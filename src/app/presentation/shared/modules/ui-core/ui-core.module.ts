import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialUiModule } from '../../components/material/material-ui.module';
import { ContainerSpinnerModule } from '../../components/container-spinner/container-spinner.module';
import { TranslateModule } from '@ngx-translate/core';

// import { DirectivesModule } from '../../directives/directives.module';

const uiModules = [
  FlexLayoutModule,
  MaterialUiModule,
  // DirectivesModule,
  ContainerSpinnerModule,
  RouterModule,
  TranslateModule
];

@NgModule({
  imports: [
    ...uiModules
  ],
  exports: [
    ...uiModules
  ],
  declarations: []
})
export class UiCoreModule { }
