import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FileDropModule } from 'ngx-file-drop'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'

import { SharedModule } from 'app/shared/shared.module'

import { EncryptionDemoComponent } from './encryption-demo.component'
import { EncryptPanelComponent } from './encrypt-panel/encrypt-panel.component'
import { DecryptPanelComponent } from './decrypt-panel/decrypt-panel.component'

@NgModule({
  imports: [
    CommonModule,
    FileDropModule,
    BsDropdownModule,
    PerfectScrollbarModule,
    SharedModule
  ],
  declarations: [
    EncryptionDemoComponent,
    EncryptPanelComponent,
    DecryptPanelComponent
  ]
})
export class EncryptionDemoModule { }
