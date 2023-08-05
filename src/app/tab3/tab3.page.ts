import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/shared/storage/storage.service';

// Storage
// RSSI {
//  enabled: true // Filter enabled?
//  value: -80
// }

interface RSSIFilter {
  enabled: boolean,
  value: number
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  rssiFilter: RSSIFilter = {
    enabled: false,
    value: 80,
  };

  constructor(private router: Router, private storage: StorageService) {}

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
