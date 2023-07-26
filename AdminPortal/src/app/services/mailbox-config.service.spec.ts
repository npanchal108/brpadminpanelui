import { TestBed, inject } from '@angular/core/testing';

import { MailConfigService } from './mailbox-config.service.';

describe('CompanyProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailConfigService]
    });
  });

  it('should be created', inject([MailConfigService], (service: MailConfigService) => {
    expect(service).toBeTruthy();
  }));
});
