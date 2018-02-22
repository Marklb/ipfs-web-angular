/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { ConfigFileComponent } from './config-file.component'

describe('ConfigFileComponent', () => {
  let component: ConfigFileComponent
  let fixture: ComponentFixture<ConfigFileComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigFileComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
