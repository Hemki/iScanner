import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import { UuidsPage } from '../subsites/configure/uuids/uuids.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'uuids',
    component: UuidsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
