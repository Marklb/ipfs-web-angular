import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { FileDropModule } from 'ngx-file-drop'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { AlertModule } from 'ngx-bootstrap/alert'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'

import { SharedModule } from 'app/shared/shared.module'

import { EncryptionDemoComponent } from './encryption-demo.component'
import { EncryptPanelComponent } from './encrypt-panel/encrypt-panel.component'
import { DecryptPanelComponent } from './decrypt-panel/decrypt-panel.component'

const routes: Routes = [
  {
    path: '',
    component: EncryptionDemoComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FileDropModule,
    BsDropdownModule,
    AlertModule,
    PerfectScrollbarModule,
    SharedModule
  ],
  declarations: [
    EncryptionDemoComponent,
    EncryptPanelComponent,
    DecryptPanelComponent
  ],
  exports: [
    RouterModule
  ]
})
export class EncryptionDemoModule { }
