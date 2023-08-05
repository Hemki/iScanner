import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RSSIFilter } from '../services/shared/types/rssiFilter';
import { StorageService } from '../services/shared/storage/storage.service';
import { DefaultRssiFilterService } from '../services/shared/defaults/defaultRssiFilter';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  scanning: boolean = false;

  rssiFilter: RSSIFilter;

  uuids: Set<string> = new Set();

  constructor(private router: Router, private storage: StorageService, private defautlRssiFilterService: DefaultRssiFilterService) {
    this.rssiFilter = this.defautlRssiFilterService.getDefaultRssiValues();
  }

  async ngOnInit(): Promise<void> {
    this.getConfigData();
  }

  ionViewWillEnter(){
    this.getConfigData();
  }

  private async getConfigData(){
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

  toggleScanning(){
    this.scanning = !this.scanning;
  }

  goToSettings() {
    this.router.navigateByUrl('/tabs/tab3');
  }

}
