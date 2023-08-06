import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'uuids',
    loadChildren: () => import('./configure/uuids/uuids.module').then( m => m.UuidsPageModule)
  },
  {
    path: 'beacon-detail/:beaconId',
    loadChildren: () => import('./beacon-detail/beacon-detail.module').then( m => m.BeaconDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
