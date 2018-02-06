import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'

import { BsDropdownModule } from 'ngx-bootstrap/dropdown'

import { WebmergeDemoComponent } from './webmerge-demo.component'
import { JspdfTplExample1Component } from 'app/shared/jspdf-templates/jspdf-tpl-example-1/jspdf-tpl-example-1.component'
// import { JspdfTemplatesModule } from 'app/shared/jspdf-templates/jspdf-templates.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    BsDropdownModule,
    // JspdfTemplatesModule
  ],
  exports: [
    WebmergeDemoComponent
  ],
  declarations: [
    WebmergeDemoComponent,
    JspdfTplExample1Component
  ]
})
export class WebmergeDemoModule { }
