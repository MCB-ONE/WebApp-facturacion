import { TestBed } from '@angular/core/testing';

import { LineafacturaService } from './lineafactura.service';

describe('LineafacturaService', () => {
  let service: LineafacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineafacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
