/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { GenerateKeyFormComponent } from './generate-key-form.component'
import { FormsModule } from '@angular/forms'

describe('GenerateKeyFormComponent', () => {
  let component: GenerateKeyFormComponent
  let fixture: ComponentFixture<GenerateKeyFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ GenerateKeyFormComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateKeyFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
