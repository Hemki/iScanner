import { Injectable } from '@angular/core';
import { RSSIFilter } from '../types/rssiFilter';

@Injectable({
  providedIn: 'root',
})
export class DefaultRssiFilterService {
  getDefaultRssiValues(): RSSIFilter {
    return {
      enabled: false,
      value: 80
    };
  }
}
