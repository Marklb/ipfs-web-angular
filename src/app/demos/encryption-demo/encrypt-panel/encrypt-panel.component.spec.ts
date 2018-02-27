/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { EncryptPanelComponent } from './encrypt-panel.component'

describe('EncryptPanelComponent', () => {
  let component: EncryptPanelComponent
  let fixture: ComponentFixture<EncryptPanelComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncryptPanelComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptPanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
