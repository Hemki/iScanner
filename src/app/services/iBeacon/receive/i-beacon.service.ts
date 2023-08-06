import { Injectable } from '@angular/core';
import { IBeacon } from '@awesome-cordova-plugins/ibeacon/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IBeaconService {

  constructor(private ibeacon: IBeacon, private platform: Platform) { }

  public async init() {

    await this.platform.ready()

    if (!this.platform.is("ios") || this.platform.is("mobileweb")) { throw new Error("This plattform is incompatible with iBeacon scanning."); }
    // Request permission to use location on iOS
    await this.ibeacon.requestAlwaysAuthorization();
    // create a new delegate and register it with the native layer
    let delegate = this.ibeacon.Delegate();

    delegate.didRangeBeaconsInRegion().subscribe((beacon) => {
      console.log(beacon);
    })

    this.ibeacon.setDelegate(delegate);

    var uuid = '00000000-0000-0000-0000-000000000000';
    var identifier = 'beaconOnTheMacBooksShelf';
    var minor = 1000;
    var major = 5;
    var beaconRegion = this.ibeacon.BeaconRegion(identifier, uuid, major, minor);

    if (await this.ibeacon.isRangingAvailable()) {
      console.log("started ranging");
      this.ibeacon.startRangingBeaconsInRegion(beaconRegion);
    }

    return
  }
}
