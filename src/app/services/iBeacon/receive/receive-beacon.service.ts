import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { Beacon, BeaconRegion } from '@awesome-cordova-plugins/ibeacon/ngx';
import { IBeacon } from '@awesome-cordova-plugins/ibeacon/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable, Subscription, map, pipe } from 'rxjs';
import { DummyBeaconService } from '../dummy/dummy-beacon.service';

@Injectable({
  providedIn: 'root'
})
export class IBeaconService implements OnDestroy {

  private subscriptions: Subscription = new Subscription();
  private beaconRegions: BeaconRegion[] = [];
  private beaconMap: Map<string, Beacon> = new Map();
  private beaconSubject: BehaviorSubject<Map<string, Beacon>> = new BehaviorSubject<Map<string, Beacon>>(this.beaconMap);
  private dummyStreamID: any; 

  constructor(private ibeacon: IBeacon, private platform: Platform, private zone: NgZone, private dummy: DummyBeaconService) {
    this.init();
  }


  private async init() {

    await this.platform.ready();

    if (!this.platform.is("ios") || this.platform.is("mobileweb")) { return}

    // Create a new delegate and register it with the native layer
    let delegate = this.ibeacon.Delegate();

    // Add Ranging Beacons to subscriptions
    this.subscriptions.add(delegate.didRangeBeaconsInRegion().subscribe((beacon) => {
      console.log(beacon.beacons);
      beacon.beacons.forEach((singleBeacon) => {
        this.zone.run(() => {
          // Beacons are stored in a map, with a compound key of UUID-Major-Minor.
          this.beaconMap.set(`${singleBeacon.uuid}-${singleBeacon.major}-${singleBeacon.minor}`, singleBeacon);
          // Update BehaviorSubject with new Beacon information
          this.beaconSubject.next(this.beaconMap);
        })
      })
    }));

    this.ibeacon.setDelegate(delegate);
  }

  public async startRanging(uuids: string[]) {

    await this.platform.ready()

    if (!this.platform.is("ios") || this.platform.is("mobileweb")) {

      //Get random dummy beacons for demo
      this.dummyStreamID = setInterval(() => {
        const singleBeacon = this.dummy.getRandomBeacon();
        // Beacons are stored in a map, with a compound key of UUID-Major-Minor.
        this.beaconMap.set(`${singleBeacon.uuid}-${singleBeacon.major}-${singleBeacon.minor}`, singleBeacon);
        // Update BehaviorSubject with new Beacon information
        this.beaconSubject.next(this.beaconMap);
      }, 1000)

      throw new Error("This plattform is incompatible with iBeacon scanning. The following data is purely for demonstration sake.");
    }

    // Request permission to use location on iOS
    await this.ibeacon.requestAlwaysAuthorization();

    // Ensure bluetooth is enabled
    if (! await this.ibeacon.isBluetoothEnabled()) { throw new Error("Please enable bluetooth") }

    // Ensure ranging is possible with the device
    if (! await this.ibeacon.isRangingAvailable()) { throw new Error("Ranging iBeacons unsucessfull. Please ensure bluetooth is enabled.") }

    uuids.forEach(async (uuid) => {
      let beaconRegion = this.ibeacon.BeaconRegion(`Ranging for ${uuid}`, uuid);
      await this.ibeacon.startRangingBeaconsInRegion(beaconRegion);
      this.beaconRegions.push(beaconRegion);
      console.log(`Started Ranging for ${uuid}`);
    })
  }

  public async stopRanging() {

    if (this.dummyStreamID) { clearInterval(this.dummyStreamID) }

    this.beaconRegions.forEach(async (beaconRegion) => {
      await this.ibeacon.stopRangingBeaconsInRegion(beaconRegion);
      console.log(`Stopped Ranging for ${beaconRegion.uuid}`)
    })
    this.beaconRegions = [];
  }

  public getBeaconMapObservable(): Observable<Map<string, Beacon>> {
    return this.beaconSubject.asObservable();
  }

  public getBeaconByBeaconId(beaconId: string): Observable<Beacon> {
    const beacon = this.beaconSubject.pipe(map((beaconMap) => {
      const stBeacon = beaconMap.get(beaconId);
      if (stBeacon) {
        return stBeacon;
      }
      throw new Error("Beacon ID could not be found")
    }));
    return beacon;
  }

  ngOnDestroy(): void {
    console.log("iBeacon service was destroyed");
    this.subscriptions.unsubscribe();
  }
}
