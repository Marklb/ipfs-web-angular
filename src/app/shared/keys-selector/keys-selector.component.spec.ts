/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { KeysSelectorComponent } from './keys-selector.component'

describe('KeysSelectorComponent', () => {
  let component: KeysSelectorComponent
  let fixture: ComponentFixture<KeysSelectorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeysSelectorComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(KeysSelectorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
