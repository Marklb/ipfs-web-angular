import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { JspdfTemplatesModule } from 'app/shared/jspdf-templates/jspdf-templates.module'

@NgModule({
  imports: [
    CommonModule,
    JspdfTemplatesModule
  ],
  exports: [
    JspdfTemplatesModule
  ],
  declarations: [ ]
})
export class SharedModule { }
