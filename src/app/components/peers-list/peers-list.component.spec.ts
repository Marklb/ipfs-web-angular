/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PeersListComponent } from './peers-list.component';

describe('PeersListComponent', () => {
  let component: PeersListComponent;
  let fixture: ComponentFixture<PeersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
