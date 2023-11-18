import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { UiCoreModule } from '../shared/modules/ui-core/ui-core.module';
import { TourModule } from '../modules/tour/tour.module';
import { ExposeModule } from '../modules/expose/expose.module';
import { SideComponent } from './side/side.component';
import { DialogModule } from '../shared/templates/dialog/dialog-template.module';
import { LinkTourModule } from '../modules/link-tour/link-tour.module';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    SideComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    DialogModule,
    // UI core
    UiCoreModule,

    // Feature Modules
    TourModule,
    ExposeModule,
    LinkTourModule,
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
