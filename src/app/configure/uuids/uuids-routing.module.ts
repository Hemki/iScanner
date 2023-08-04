import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UuidsPage } from './uuids.page';

const routes: Routes = [
  {
    path: '',
    component: UuidsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UuidsPageRoutingModule {}
