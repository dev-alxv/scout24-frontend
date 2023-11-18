import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinkTourComponent } from './presentation/modules/link-tour/link-tour.component';
import { TourComponent } from './presentation/modules/tour/tour.component';


export const routes: Routes = [

  {
    path: 'link-tour/:exposeId',
    component: LinkTourComponent
  },

  {
    path: '',
    component: TourComponent
  },

  {
    path: ':tourId',
    component: TourComponent
  },

  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
