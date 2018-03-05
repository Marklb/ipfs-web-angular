import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { FileDropModule } from 'ngx-file-drop'

import { StoredKeysManagerUiModule } from './stored-keys-manager-ui/stored-keys-manager-ui.module'
import { JspdfTemplatesModule } from 'app/shared/jspdf-templates/jspdf-templates.module'

import { CardWidgetComponent } from './card-widget/card-widget.component'
import { KeysSelectorComponent } from './keys-selector/keys-selector.component'
import { FilesDropPickComponent } from './files-drop-pick/files-drop-pick.component'
import { PrivatekeyPassphraseDialogComponent } from './privatekey-passphrase-dialog/privatekey-passphrase-dialog.component'
import { SettingsManagerComponent } from './settings-manager/settings-manager.component'

import { OverlayScrollbarDirective } from './directives/overlay-scrollbar.directive'


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
    FilesDropPickComponent,
    SettingsManagerComponent,
    OverlayScrollbarDirective
  ],
  declarations: [
    CardWidgetComponent,
    KeysSelectorComponent,
    FilesDropPickComponent,
    PrivatekeyPassphraseDialogComponent,
    SettingsManagerComponent,
    OverlayScrollbarDirective
  ]
})
export class SharedModule { }
