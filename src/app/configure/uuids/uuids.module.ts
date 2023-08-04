import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UuidsPageRoutingModule } from './uuids-routing.module';

import { UuidsPage } from './uuids.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UuidsPageRoutingModule
  ],
  declarations: [UuidsPage]
})
export class UuidsPageModule {}
