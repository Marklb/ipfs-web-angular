import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { FileDropModule } from 'ngx-file-drop'

import { StoredKeysManagerUiModule } from './stored-keys-manager-ui/stored-keys-manager-ui.module'
import { JspdfTemplatesModule } from 'app/shared/jspdf-templates/jspdf-templates.module'

import { CardWidgetComponent } from './card-widget/card-widget.component'
import { KeysSelectorComponent } from './keys-selector/keys-selector.component'
import { FilesDropPickComponent } from './files-drop-pick/files-drop-pick.component'
import { PrivatekeyPassphraseDialogComponent } from './privatekey-passphrase-dialog/privatekey-passphrase-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    JspdfTemplatesModule,
    StoredKeysManagerUiModule,
    BsDropdownModule,
    FileDropModule
  ],
  exports: [
    JspdfTemplatesModule,
    StoredKeysManagerUiModule,
    CardWidgetComponent,
    KeysSelectorComponent,
    FilesDropPickComponent
  ],
  declarations: [
    CardWidgetComponent,
    KeysSelectorComponent,
    FilesDropPickComponent,
    PrivatekeyPassphraseDialogComponent
]
})
export class SharedModule { }
