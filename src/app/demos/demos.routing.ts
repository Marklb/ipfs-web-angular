import { RouterModule, Routes } from '@angular/router'

import { WebmergeDemoComponent } from 'app/demos/webmerge-demo/webmerge-demo.component'
import { JspdfDemoComponent } from 'app/demos/jspdf-demo/jspdf-demo.component'
import { FilesUploadDemoComponent } from 'app/demos/files-upload-demo/files-upload-demo.component'
import { HashCheckDemoComponent } from 'app/demos/hash-check-demo/hash-check-demo.component'
import { DigitalSignatureDemoComponent } from 'app/demos/digital-signature-demo/digital-signature-demo.component'
import { EncryptionDemoComponent } from 'app/demos/encryption-demo/encryption-demo.component'
import { DocumentEditorDemoComponent } from 'app/demos/document-editor-demo/document-editor-demo.component'

const routes: Routes = [
  { path: 'webmerge', component: WebmergeDemoComponent },
  { path: 'jspdf', component: JspdfDemoComponent },
  { path: 'files-upload', component: FilesUploadDemoComponent },
  { path: 'hash-check', component: HashCheckDemoComponent },
  { path: 'digital-signature', component: DigitalSignatureDemoComponent },
  { path: 'encryption', component: EncryptionDemoComponent },
  { path: 'document-editor', component: DocumentEditorDemoComponent }
]

export const demosRoutes = routes
