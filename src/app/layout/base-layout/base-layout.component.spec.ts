/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { BaseLayoutComponent } from './base-layout.component'

describe('BaseLayoutComponent', () => {
  let component: BaseLayoutComponent
  let fixture: ComponentFixture<BaseLayoutComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseLayoutComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLayoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
