import { TestBed } from '@angular/core/testing';

import { GraphqlUsersService } from './graphql-users.service';

describe('GraphqlUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphqlUsersService = TestBed.get(GraphqlUsersService);
    expect(service).toBeTruthy();
  });
});
