import { Component, OnInit } from '@angular/core';
import { TxParameters } from '../services/shared/types/txParameters';
import { DefaultTxParametersService } from '../services/shared/defaults/defaultTxParameters';
import { StorageService } from '../services/shared/storage/storage.service';
import { AlertController } from '@ionic/angular';
import { TransmitService } from '../services/iBeacon/transmit/transmit-beacon.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  txParameters: TxParameters;
  advertising: boolean = false;

  constructor(private defaultTxParametersService: DefaultTxParametersService, private storage: StorageService, private alertController: AlertController, private iBeacon: TransmitService) {
    this.txParameters = this.defaultTxParametersService.getDefaultTxParameters();
  }

  async ngOnInit(): Promise<void> {
    await this.getConfigData();
  }

  async ionViewWillEnter() {
    await this.getConfigData();
  }

  async getConfigData() {
    const storedTxParameters = await this.storage.get("txParam");
    if (storedTxParameters) {
      this.txParameters = storedTxParameters;
    }
  }

  async toggleAdvertising(){
    if (this.txParameters.uuid === "") {
      return;
    }
    if (this.advertising) {
      await this.iBeacon.stopAdvertising();
    } else {
      try {
        await this.iBeacon.startAdvertising(this.txParameters);
      } catch (error) {
        if (error instanceof Error) {
          const alert = await this.alertController.create({
            header: 'Error',
            message: error.message,
            buttons: ['OK'],
          });
          await alert.present();
          return;
        } else {
          console.error(error);
          return;
        }
      }
    }
    this.advertising = !this.advertising;
  }

}
