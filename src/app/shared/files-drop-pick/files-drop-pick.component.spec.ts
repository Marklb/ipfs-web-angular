/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { FilesDropPickComponent } from './files-drop-pick.component'

describe('FilesDropPickComponent', () => {
  let component: FilesDropPickComponent
  let fixture: ComponentFixture<FilesDropPickComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesDropPickComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesDropPickComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
