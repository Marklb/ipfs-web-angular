import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { JspdfTemplatesModule } from 'app/shared/jspdf-templates/jspdf-templates.module'

import { StoredKeysManagerUiComponent } from './stored-keys-manager-ui/stored-keys-manager-ui.component'


@NgModule({
  imports: [
    CommonModule,
    JspdfTemplatesModule
  ],
  exports: [
    JspdfTemplatesModule,
    StoredKeysManagerUiComponent
  ],
  declarations: [
    StoredKeysManagerUiComponent
  ]
})
export class SharedModule { }
