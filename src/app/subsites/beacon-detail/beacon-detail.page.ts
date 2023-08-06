import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Beacon } from '@awesome-cordova-plugins/ibeacon/ngx';
import { IBeaconService } from '../../services/iBeacon/receive/receive-beacon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-beacon-detail',
  templateUrl: './beacon-detail.page.html',
  styleUrls: ['./beacon-detail.page.scss'],
})
export class BeaconDetailPage {

  public beaconId: string
  public beacon$: Observable<Beacon>;

  constructor(private router: Router, private iBeacon: IBeaconService) {
    // Get the beaconId from the URL
    const parts = this.router.url.split('/');
    this.beaconId = parts[parts.length - 1];

    // Get the beacon via beaconId from the beacon service
    this.beacon$ = this.iBeacon.getBeaconByBeaconId(this.beaconId);
  }


}
