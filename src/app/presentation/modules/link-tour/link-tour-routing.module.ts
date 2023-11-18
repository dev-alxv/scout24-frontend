import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkTourComponent } from './link-tour.component';


export const routes: Routes = [
  {
    path: '',
    component: LinkTourComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkTourRoutingModule { }
