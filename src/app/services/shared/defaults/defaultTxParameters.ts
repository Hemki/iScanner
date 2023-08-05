import { Injectable } from '@angular/core';
import { TxParameters } from '../types/txParameters';

@Injectable({
  providedIn: 'root',
})
export class DefaultTxParametersService {
  getDefaultTxParameters(): TxParameters {
    return {
      enabled: false,
      uuid: "",
      major: 0,
      minor: 0,
      advertisingInterval: 0,
      txPower: 0,
    };
  }
}
