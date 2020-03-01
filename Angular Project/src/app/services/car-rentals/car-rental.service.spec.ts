import { TestBed } from '@angular/core/testing';

import { CarRentalService } from './car-rental.service';

describe('CarRentalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarRentalService = TestBed.get(CarRentalService);
    expect(service).toBeTruthy();
  });
});
