import { TestBed } from '@angular/core/testing';

import { CarTransactionService } from './car-transaction.service';

describe('CarTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarTransactionService = TestBed.get(CarTransactionService);
    expect(service).toBeTruthy();
  });
});
