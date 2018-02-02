import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebmergeDemoModule } from './webmerge-demo/webmerge-demo.module'
import { JspdfDemoModule } from './jspdf-demo/jspdf-demo.module'
import { FilesUploadDemoModule } from './files-upload-demo/files-upload-demo.module'


import { DemosComponent } from './demos.component'


@NgModule({
  imports: [
    CommonModule,
    WebmergeDemoModule,
    JspdfDemoModule,
    FilesUploadDemoModule,
    RouterModule
  ],
  exports: [
    DemosComponent
  ],
  declarations: [
    DemosComponent
  ]
})
export class DemosModule { }