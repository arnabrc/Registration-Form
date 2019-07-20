import { TestBed, async, inject } from '@angular/core/testing';

import { StopRouteGuard } from './stop-route.guard';

describe('StopRouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StopRouteGuard]
    });
  });

  it('should ...', inject([StopRouteGuard], (guard: StopRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
