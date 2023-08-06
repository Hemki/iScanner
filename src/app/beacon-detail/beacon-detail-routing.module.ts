import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeaconDetailPage } from './beacon-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BeaconDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeaconDetailPageRoutingModule {}
