import { TestBed } from '@angular/core/testing';

import { IBeaconService } from './receive-beacon.service';

describe('IBeaconService', () => {
  let service: IBeaconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IBeaconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
