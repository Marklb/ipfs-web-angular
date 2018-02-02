/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JspdfTplExample-1Component } from './jspdf-tpl-example-1.component';

describe('JspdfTplExample-1Component', () => {
  let component: JspdfTplExample-1Component;
  let fixture: ComponentFixture<JspdfTplExample-1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JspdfTplExample-1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JspdfTplExample-1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
