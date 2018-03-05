/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { DocumentSchemaComponent } from './document-schema.component'

describe('DocumentSchemaComponent', () => {
  let component: DocumentSchemaComponent
  let fixture: ComponentFixture<DocumentSchemaComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentSchemaComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSchemaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
