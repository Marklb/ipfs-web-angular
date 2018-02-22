/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { DagExplorerComponent } from './dag-explorer.component'

describe('DagExplorerComponent', () => {
  let component: DagExplorerComponent
  let fixture: ComponentFixture<DagExplorerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DagExplorerComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DagExplorerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
