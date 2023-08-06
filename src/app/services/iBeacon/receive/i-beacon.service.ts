import { Injectable, OnDestroy } from '@angular/core';
import { IBeacon } from '@awesome-cordova-plugins/ibeacon/ngx';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IBeaconService implements OnDestroy {

  private subscriptions: Subscription = new Subscription();

  constructor(private ibeacon: IBeacon, private platform: Platform) { }

  public async init(uuids: string[]) {

    await this.platform.ready()

    if (!this.platform.is("ios") || this.platform.is("mobileweb")) { throw new Error("This plattform is incompatible with iBeacon scanning."); }

    // ToDo: Check whether init was already called previously


    // Request permission to use location on iOS
    await this.ibeacon.requestAlwaysAuthorization();

    const test = await this.ibeacon.isBluetoothEnabled();
    console.log(test);
    console.log("SFAKJHFKHAKLFGKHJAGSJDHGAJSGDJGASJ")

    const hi = await this.ibeacon.isRangingAvailable();
    console.log(hi);
    console.log("SFAKJHFKHAKLFGKHJAGSJDHGAJSGDJGASJ")

    // Ensure bluetooth is enabled
    if (! await this.ibeacon.isBluetoothEnabled()) { throw new Error("Please enable bluetooth") }

    // Ensure ranging is possible with the device
    if (! await this.ibeacon.isRangingAvailable()) { throw new Error("Ranging iBeacons unsucessfull. Please ensure bluetooth is enabled.") }


    // create a new delegate and register it with the native layer
    let delegate = this.ibeacon.Delegate();

    // Add Ranging Beacons to subscriptions
    this.subscriptions.add(delegate.didRangeBeaconsInRegion().subscribe((beacon) => {
      console.log(beacon);
      console.log(beacon.beacons);
    }));

    this.ibeacon.setDelegate(delegate);

    // var uuid = '00000000-0000-0000-0000-000000000000';
    // var identifier = 'beaconOnTheMacBooksShelf';
    // var minor = 1000;
    // var major = 5;
    // var beaconRegion = this.ibeacon.BeaconRegion(identifier, uuid, major, minor);

    uuids.forEach(async (uuid) => {
      let beaconRegion = this.ibeacon.BeaconRegion(`Ranging for ${uuid}`, uuid);
      await this.ibeacon.startRangingBeaconsInRegion(beaconRegion);
      console.log(`Started Ranging for ${uuid}`);
    })

    return;
  }

  ngOnDestroy(): void {
    console.log("iBeacon service was destroyed");
    this.subscriptions.unsubscribe();
  }
}
