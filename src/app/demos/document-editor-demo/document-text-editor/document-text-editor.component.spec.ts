/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { DocumentTextEditorComponent } from './document-text-editor.component'

describe('DocumentTextEditorComponent', () => {
  let component: DocumentTextEditorComponent
  let fixture: ComponentFixture<DocumentTextEditorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTextEditorComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTextEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
