import { RouterModule, Routes } from '@angular/router'

import { WebmergeDemoComponent } from 'app/demos/webmerge-demo/webmerge-demo.component'
import { JspdfDemoComponent } from 'app/demos/jspdf-demo/jspdf-demo.component'
import { FilesUploadDemoComponent } from 'app/demos/files-upload-demo/files-upload-demo.component'
import { HashCheckDemoComponent } from 'app/demos/hash-check-demo/hash-check-demo.component'

const routes: Routes = [
  { path: 'webmerge', component: WebmergeDemoComponent },
  { path: 'jspdf', component: JspdfDemoComponent },
  { path: 'files-upload', component: FilesUploadDemoComponent },
  { path: 'hash-check', component: HashCheckDemoComponent }
]

export const demosRoutes = routes
