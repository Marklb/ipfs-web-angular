/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrivatekeyPassphraseDialogComponent } from './privatekey-passphrase-dialog.component';

describe('PrivatekeyPassphraseDialogComponent', () => {
  let component: PrivatekeyPassphraseDialogComponent;
  let fixture: ComponentFixture<PrivatekeyPassphraseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatekeyPassphraseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatekeyPassphraseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
