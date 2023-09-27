import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RSSIFilter } from '../../services/shared/types/rssiFilter';
import { StorageService } from '../../services/shared/storage/storage.service';
import { DefaultRssiFilterService } from '../../services/shared/defaults/defaultRssiFilter';
import { IBeaconService } from '../../services/iBeacon/receive/receive-beacon.service';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Beacon } from '@awesome-cordova-plugins/ibeacon/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  beaconMap$: Observable<Map<string, Beacon>>;

  scanning: boolean = false;
  rssiFilter: RSSIFilter;

  uuids: Set<string> = new Set();

  constructor(private alertController: AlertController, private router: Router, private storage: StorageService, private defautlRssiFilterService: DefaultRssiFilterService, private ibeacon: IBeaconService) {
    this.rssiFilter = this.defautlRssiFilterService.getDefaultRssiValues();
    this.beaconMap$ = this.ibeacon.getBeaconMapObservable();
  }

  async ngOnInit(): Promise<void> {
    await this.getConfigData();
  }

  async ionViewWillEnter() {
    await this.getConfigData();
  }

  public openDetailPane(key: string) {
    this.router.navigateByUrl(`tabs/tab1/beacon-detail/${key}`);
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
    if (this.scanning) {
      await this.ibeacon.stopRanging();
    } else {
      try {
        await this.ibeacon.startRanging(Array.from(this.uuids));
      } catch (error) {
        if (error instanceof Error) {
          const alert = await this.alertController.create({
            header: 'Error',
            message: error.message,
            buttons: ['OK'],
          });
          await alert.present();
        } else {
          console.error(error);
          return;
        }
      }
    }
    this.scanning = !this.scanning;
  }


  goToSettings() {
    this.router.navigateByUrl('/tabs/tab3');
  }

}
