/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SummernoteComponent } from './summernote.component';

describe('SummernoteComponent', () => {
  let component: SummernoteComponent;
  let fixture: ComponentFixture<SummernoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummernoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummernoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
