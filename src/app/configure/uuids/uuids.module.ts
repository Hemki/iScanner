import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UuidsComponent } from './uuids.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [UuidsComponent],
  exports: [UuidsComponent]
})
export class UuidsComponentModule {}
