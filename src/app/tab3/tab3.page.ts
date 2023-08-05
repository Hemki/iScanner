import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/shared/storage/storage.service';
import { RSSIFilter } from '../services/shared/types/rssiFilter';
import { TxParameters } from '../services/shared/types/txParameters';
import { DefaultTxParametersService } from '../services/shared/defaults/defaultTxParameters';
import { DefaultRssiFilterService } from '../services/shared/defaults/defaultRssiFilter';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  rssiFilter: RSSIFilter;

  txParameters: TxParameters

  constructor(private router: Router, private storage: StorageService, private defaultTxParametersService: DefaultTxParametersService, private defautlRssiFilterService: DefaultRssiFilterService) {
    this.txParameters = this.defaultTxParametersService.getDefaultTxParameters();
    this.rssiFilter = this.defautlRssiFilterService.getDefaultRssiValues();
  } 

  async ngOnInit(): Promise<void> {
    const storedRssiFilter = await this.storage.get("rssi");
    if (storedRssiFilter) {
      this.rssiFilter = storedRssiFilter;
    }
  }

  goToUuidsPage() {
    this.router.navigateByUrl('/tabs/tab3/uuids');
  }

  pinFormatter(value: number) {
    return `-${value}`;
  }

  async updateRssiFilter(){
    await this.storage.set("rssi",this.rssiFilter);
  }

}
