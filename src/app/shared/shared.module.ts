import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { StoredKeysManagerUiModule } from './stored-keys-manager-ui/stored-keys-manager-ui.module'

import { JspdfTemplatesModule } from 'app/shared/jspdf-templates/jspdf-templates.module'


@NgModule({
  imports: [
    CommonModule,
    JspdfTemplatesModule,
    StoredKeysManagerUiModule
  ],
  exports: [
    JspdfTemplatesModule,
    StoredKeysManagerUiModule
  ],
  declarations: [

  ]
})
export class SharedModule { }
