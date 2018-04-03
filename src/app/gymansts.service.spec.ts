import { TestBed, inject } from '@angular/core/testing';

import { GymanstsService } from './gymansts.service';

describe('GymanstsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GymanstsService]
    });
  });

  it('should be created', inject([GymanstsService], (service: GymanstsService) => {
    expect(service).toBeTruthy();
  }));
});
