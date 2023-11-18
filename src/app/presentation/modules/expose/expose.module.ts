import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { ExposeComponent } from './expose.component';
import { ExposeListItemComponent } from '../../shared/components/expose-list-item/expose-list-item.component';
import { UiCoreModule } from '../../shared/modules/ui-core/ui-core.module';

const components = [
  ExposeComponent,
  ExposeListItemComponent
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
export class ExposeModule { }
