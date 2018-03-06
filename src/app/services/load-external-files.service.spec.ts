/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { LoadExternalFilesService } from './load-external-files.service'

describe('Service: LoadExternalFiles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadExternalFilesService]
    })
  })

  it('should ...', inject([LoadExternalFilesService], (service: LoadExternalFilesService) => {
    expect(service).toBeTruthy()
  }))
})
