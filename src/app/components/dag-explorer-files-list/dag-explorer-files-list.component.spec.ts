/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { DagExplorerFilesListComponent } from './dag-explorer-files-list.component'

describe('DagExplorerFilesListComponent', () => {
  let component: DagExplorerFilesListComponent
  let fixture: ComponentFixture<DagExplorerFilesListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DagExplorerFilesListComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DagExplorerFilesListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
