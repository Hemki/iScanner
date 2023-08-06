import { TestBed } from '@angular/core/testing';

import { TransmitService } from './transmit.service';

describe('TransmitService', () => {
  let service: TransmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
