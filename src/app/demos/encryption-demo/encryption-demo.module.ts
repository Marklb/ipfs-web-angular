import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FileDropModule } from 'ngx-file-drop'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'

import { SharedModule } from 'app/shared/shared.module'

import { EncryptionDemoComponent } from './encryption-demo.component'

@NgModule({
  imports: [
    CommonModule,
    FileDropModule,
    BsDropdownModule,
    SharedModule
  ],
  declarations: [EncryptionDemoComponent]
})
export class EncryptionDemoModule { }