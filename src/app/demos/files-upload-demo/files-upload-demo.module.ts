import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FileDropModule } from 'ngx-file-drop'

import { FilesUploadDemoComponent } from './files-upload-demo.component'


@NgModule({
  imports: [
    CommonModule,
    FileDropModule
  ],
  declarations: [
    FilesUploadDemoComponent
  ]
})
export class FilesUploadDemoModule { }
