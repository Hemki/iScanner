import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeaconDetailPageRoutingModule } from './beacon-detail-routing.module';

import { BeaconDetailPage } from './beacon-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeaconDetailPageRoutingModule
  ],
  declarations: [BeaconDetailPage]
})
export class BeaconDetailPageModule {}
