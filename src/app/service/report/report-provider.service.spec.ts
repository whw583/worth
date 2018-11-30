import { TestBed } from '@angular/core/testing';

import { ReportProviderService } from './report-provider.service';

describe('ReportProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportProviderService = TestBed.get(ReportProviderService);
    expect(service).toBeTruthy();
  });
});
