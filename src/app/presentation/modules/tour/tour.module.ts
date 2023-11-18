import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TourComponent } from './tour.component';
import { UiCoreModule } from '../../shared/modules/ui-core/ui-core.module';
import { TourListItemComponent } from '../../shared/components/tour-list-item/tour-list-item.component';

const components = [
  TourComponent,
  TourListItemComponent
]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FlexLayoutModule,
    NgxPaginationModule,
    // UI core
    UiCoreModule,
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class TourModule { }
