/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { JspdfTplExample1Component } from './jspdf-tpl-example-1.component'

describe('JspdfTplExample1Component', () => {
  let component: JspdfTplExample1Component
  let fixture: ComponentFixture<JspdfTplExample1Component>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JspdfTplExample1Component ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(JspdfTplExample1Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
