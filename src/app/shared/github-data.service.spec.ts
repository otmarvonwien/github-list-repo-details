import { TestBed, inject } from '@angular/core/testing';

import { GitubDataService } from './github-data.service';

describe('GitubDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GitubDataService]
    });
  });

  it('should be created', inject([GitubDataService], (service: GitubDataService) => {
    expect(service).toBeTruthy();
  }));
});
