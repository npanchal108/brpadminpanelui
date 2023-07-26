import { TestBed, inject } from '@angular/core/testing';

import { UserprocesstimeService } from './userprocesstime.service';

describe('UserprocesstimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserprocesstimeService]
    });
  });

  it('should be created', inject([UserprocesstimeService], (service: UserprocesstimeService) => {
    expect(service).toBeTruthy();
  }));
});
