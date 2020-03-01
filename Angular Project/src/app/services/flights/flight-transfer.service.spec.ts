import { TestBed } from '@angular/core/testing';

import { FlightTransferService } from './flight-transfer.service';

describe('FlightTransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightTransferService = TestBed.get(FlightTransferService);
    expect(service).toBeTruthy();
  });
});
