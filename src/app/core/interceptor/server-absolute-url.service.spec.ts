import { TestBed } from '@angular/core/testing';

import { ServerAbsoluteUrlService } from './server-absolute-url.service';

describe('ServerAbsoluteUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerAbsoluteUrlService = TestBed.get(ServerAbsoluteUrlService);
    expect(service).toBeTruthy();
  });
});
