/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StoredKeysService } from './stored-keys.service';

describe('Service: StoredKeys', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoredKeysService]
    });
  });

  it('should ...', inject([StoredKeysService], (service: StoredKeysService) => {
    expect(service).toBeTruthy();
  }));
});