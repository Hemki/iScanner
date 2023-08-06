import { Injectable, OnDestroy } from '@angular/core';
import { Beacon, BeaconRegion } from '@awesome-cordova-plugins/ibeacon/ngx';
import { IBeacon } from '@awesome-cordova-plugins/ibeacon/ngx';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TxParameters } from '../../shared/types/txParameters';

@Injectable({
  providedIn: 'root'
})
export class TransmitService {
  private beaconRegions: BeaconRegion[] = []

  constructor(private ibeacon: IBeacon, private platform: Platform) {
    this.init();
  }


  private async init() {

    await this.platform.ready();

    if (!this.platform.is("ios") || this.platform.is("mobileweb")) { throw new Error("This plattform is incompatible with iBeacon scanning."); }

  }

  async startAdvertising(txParameters: TxParameters) {

    await this.platform.ready()

    if (!this.platform.is("ios") || this.platform.is("mobileweb")) { throw new Error("This plattform is incompatible with iBeacon advertising."); }

    // Request permission to use location on iOS
    await this.ibeacon.requestAlwaysAuthorization();

    // Ensure bluetooth is enabled
    if (! await this.ibeacon.isBluetoothEnabled()) { throw new Error("Please enable bluetooth") }

    // Ensure ranging is possible with the device
    if (! await this.ibeacon.isAdvertisingAvailable()) { throw new Error("Advertising as iBeacon unsucessfull. Please ensure bluetooth is enabled.") }

    // Ensure major and minor ar numbers
    if (typeof txParameters.major != "number" || typeof txParameters.minor != "number") {
      throw new Error("Major and Minor must be number");
    }

    // Start Advertising as iBeacon
    let beaconRegion = this.ibeacon.BeaconRegion(`Advertising as ${txParameters.uuid}`, txParameters.uuid, txParameters.major, txParameters.minor);
    await this.ibeacon.startAdvertising(beaconRegion);
    this.beaconRegions.push(beaconRegion);
  }

  async stopAdvertising() {
    this.beaconRegions.forEach(async (beaconRegion) =>{
      await this.ibeacon.stopAdvertising(beaconRegion)
    })
    this.beaconRegions = [];
  }
}
