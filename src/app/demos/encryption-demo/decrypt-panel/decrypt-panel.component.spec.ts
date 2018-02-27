/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { DecryptPanelComponent } from './decrypt-panel.component'

describe('DecryptPanelComponent', () => {
  let component: DecryptPanelComponent
  let fixture: ComponentFixture<DecryptPanelComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecryptPanelComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DecryptPanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
