import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { JspdfTplExample1Component } from 'app/shared/jspdf-templates/jspdf-tpl-example-1/jspdf-tpl-example-1.component'

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    JspdfTplExample1Component
  ],
  declarations: [
    JspdfTplExample1Component
  ]
})
export class JspdfTemplatesModule { }
