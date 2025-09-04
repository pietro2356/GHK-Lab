import { TestBed } from '@angular/core/testing';

import { Ghk } from './ghk';

describe('Ghk', () => {
  let service: Ghk;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ghk);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
