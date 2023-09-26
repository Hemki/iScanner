import { Injectable } from '@angular/core';
import { Beacon } from '@awesome-cordova-plugins/ibeacon/ngx';

@Injectable({
  providedIn: 'root'
})
export class DummyBeaconService {

  private dummyBeaconList: Beacon[] = [
    {
      uuid: "b7e18b02-5ca0-11ee-8c99-0242ac120002",
      major: 1,
      minor: 1,
      proximity: "ProximityFar",
      tx: -50,
      rssi: -70,
      accuracy: 0,
    },
    {
      uuid: "b7e18b02-5ca0-11ee-8c99-0242ac120002",
      major: 1,
      minor: 2,
      proximity: "ProximityFar",
      tx: -50,
      rssi: -70,
      accuracy: 0,
    },
    {
      uuid: "b7e18b02-5ca0-11ee-8c99-0242ac120002",
      major: 10,
      minor: 49,
      proximity: "ProximityFar",
      tx: -80,
      rssi: -70,
      accuracy: 0,
    }
  ];

  private proximityPossibilities: any[] = ["ProximityImmediate", "ProximityNear", "ProximityFar", "ProximityUnknown"];
  private rssiValues: number[] = [-26, -40, -60, -100];

  constructor() { }

  public getRandomBeacon(): Beacon {

    const dummyBeacon = this.dummyBeaconList[Math.floor(Math.random() * this.dummyBeaconList.length)];
    const randomProximity = this.proximityPossibilities[Math.floor(Math.random() * this.proximityPossibilities.length)];
    const randomRssiValue = this.rssiValues[Math.floor(Math.random() * this.rssiValues.length)];
    const randomDistanceDummyBeacon: Beacon = {
      ...dummyBeacon, 
      proximity: randomProximity,
      rssi: randomRssiValue
    };
    return randomDistanceDummyBeacon;
  }
}
