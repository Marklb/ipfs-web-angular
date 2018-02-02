import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// import { JspdfTemplatesModule } from 'app/shared/jspdf-templates/jspdf-templates.module'

import { JspdfDemoComponent } from './jspdf-demo.component'


@NgModule({
  imports: [
    CommonModule,
    // JspdfTemplatesModule
  ],
  exports: [
    JspdfDemoComponent
  ],
  declarations: [
    JspdfDemoComponent
  ]
})
export class JspdfDemoModule { }
