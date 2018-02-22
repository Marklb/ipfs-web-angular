/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { StoredKeysManagerUiComponent } from './stored-keys-manager-ui.component'

describe('StoredKeysManagerUiComponent', () => {
  let component: StoredKeysManagerUiComponent
  let fixture: ComponentFixture<StoredKeysManagerUiComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoredKeysManagerUiComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(StoredKeysManagerUiComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
