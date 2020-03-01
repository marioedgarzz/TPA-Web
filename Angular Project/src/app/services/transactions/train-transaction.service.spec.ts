import { TestBed } from '@angular/core/testing';

import { TrainTransactionService } from './train-transaction.service';

describe('TrainTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainTransactionService = TestBed.get(TrainTransactionService);
    expect(service).toBeTruthy();
  });
});
