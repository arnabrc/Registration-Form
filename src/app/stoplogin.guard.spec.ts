import { TestBed, async, inject } from '@angular/core/testing';

import { StoploginGuard } from './stoplogin.guard';

describe('StoploginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoploginGuard]
    });
  });

  it('should ...', inject([StoploginGuard], (guard: StoploginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
