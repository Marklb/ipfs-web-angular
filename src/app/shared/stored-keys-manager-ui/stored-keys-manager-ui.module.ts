import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { ModalModule } from 'ngx-bootstrap/modal'

import { StoredKeysManagerUiComponent } from './stored-keys-manager-ui.component'
import { GenerateKeyFormComponent } from './generate-key-form/generate-key-form.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule
  ],
  exports: [
    StoredKeysManagerUiComponent
  ],
  declarations: [
    StoredKeysManagerUiComponent,
    GenerateKeyFormComponent
  ]
})
export class StoredKeysManagerUiModule { }
