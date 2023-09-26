import { TestBed } from '@angular/core/testing';

import { DummyBeaconService } from './dummy-beacon.service';

describe('DummyBeaconService', () => {
  let service: DummyBeaconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyBeaconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
