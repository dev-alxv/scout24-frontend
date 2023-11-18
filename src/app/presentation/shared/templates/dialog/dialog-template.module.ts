import { NgModule } from '@angular/core';
import { DialogTemplateComponent } from './dialog-template.component';
import { UiCoreModule } from '../../modules/ui-core/ui-core.module';



@NgModule({
  declarations: [
    DialogTemplateComponent
  ],
  imports: [
    UiCoreModule,
  ],
  exports: [DialogTemplateComponent]
})
export class DialogModule { }
