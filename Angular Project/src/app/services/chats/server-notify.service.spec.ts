import { TestBed } from '@angular/core/testing';

import { ServerNotifyService } from './server-notify.service';

describe('ServerNotifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerNotifyService = TestBed.get(ServerNotifyService);
    expect(service).toBeTruthy();
  });
});
