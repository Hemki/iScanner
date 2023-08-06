import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RSSIFilter } from '../services/shared/types/rssiFilter';
import { StorageService } from '../services/shared/storage/storage.service';
import { DefaultRssiFilterService } from '../services/shared/defaults/defaultRssiFilter';
import { IBeaconService } from '../services/iBeacon/receive/i-beacon.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  scanning: boolean = false;
  rssiFilter: RSSIFilter;

  uuids: Set<string> = new Set();

  constructor(private alertController: AlertController, private router: Router, private storage: StorageService, private defautlRssiFilterService: DefaultRssiFilterService, private ibeacon: IBeaconService) {
    this.rssiFilter = this.defautlRssiFilterService.getDefaultRssiValues();
  }

  async ngOnInit(): Promise<void> {
    this.getConfigData();
  }

  ionViewWillEnter() {
    this.getConfigData();
  }

  private async getConfigData() {
    // get initial configuration data (rssiFilter object and UUID Set)
    const savedRssiFilter = await this.storage.get("rssi")
    if (savedRssiFilter) {
      this.rssiFilter = savedRssiFilter;
    }

    const savedUuids = await this.storage.get("uuids")
    if (savedUuids) {
      this.uuids = savedUuids;
    }
  }

  async toggleScanning() {
    if (!this.uuids.size) {
      return;
    }
    try {
      await this.ibeacon.init(Array.from(this.uuids));
      this.scanning = !this.scanning;
    } catch (error) {
      if (error instanceof Error) {
        const alert = await this.alertController.create({
          header: 'Incompatible Platform',
          message: error.message,
          buttons: ['OK'],
        });
        await alert.present();
      } else {
        console.error(error);
      }
    }
  }

  goToSettings() {
    this.router.navigateByUrl('/tabs/tab3');
  }

}
