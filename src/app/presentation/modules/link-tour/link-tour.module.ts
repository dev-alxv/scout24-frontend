import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UiCoreModule } from '../../shared/modules/ui-core/ui-core.module';
import { LinkTourComponent } from './link-tour.component';
import { LinkTourListItemComponent } from '../../shared/components/link-tour-list-item/link-tour-list-item.component';

const components = [
  LinkTourComponent,
  LinkTourListItemComponent
]

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxPaginationModule,
    // UI core
    UiCoreModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class LinkTourModule { }
