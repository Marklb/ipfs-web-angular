import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebmergeDemoModule } from './webmerge-demo/webmerge-demo.module'
import { JspdfDemoModule } from './jspdf-demo/jspdf-demo.module'
import { FilesUploadDemoModule } from './files-upload-demo/files-upload-demo.module'
import { HashCheckDemoModule } from './hash-check-demo/hash-check-demo.module'
import { DigitalSignatureDemoModule } from './digital-signature-demo/digital-signature-demo.module'
// import { EncryptionDemoModule } from './encryption-demo/encryption-demo.module'
import { DocumentEditorDemoModule } from './document-editor-demo/document-editor-demo.module'

import { DemosComponent } from './demos.component'


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    WebmergeDemoModule,
    JspdfDemoModule,
    FilesUploadDemoModule,
    HashCheckDemoModule,
    DigitalSignatureDemoModule,
    // EncryptionDemoModule,
    DocumentEditorDemoModule
  ],
  exports: [
    DemosComponent
  ],
  declarations: [
    DemosComponent
]
})
export class DemosModule { }
