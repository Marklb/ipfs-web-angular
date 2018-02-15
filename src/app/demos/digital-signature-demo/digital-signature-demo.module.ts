import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FileDropModule } from 'ngx-file-drop'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'

import { SharedModule } from 'app/shared/shared.module'

import { DigitalSignatureDemoComponent } from './digital-signature-demo.component'

@NgModule({
  imports: [
    CommonModule,
    FileDropModule,
    BsDropdownModule,
    SharedModule
  ],
  declarations: [DigitalSignatureDemoComponent]
})
export class DigitalSignatureDemoModule { }
