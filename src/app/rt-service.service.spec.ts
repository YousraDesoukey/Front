import { TestBed, inject } from '@angular/core/testing';

import { RtServiceService } from './rt-service.service';

describe('RtServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RtServiceService]
    });
  });

  it('should be created', inject([RtServiceService], (service: RtServiceService) => {
    expect(service).toBeTruthy();
  }));
});
