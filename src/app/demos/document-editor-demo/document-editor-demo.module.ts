import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { CovalentCodeEditorModule } from '@covalent/code-editor'
import { CovalentJsonFormatterModule, CovalentExpansionPanelModule } from '@covalent/core'
import { MatIconModule, MatListModule, MatFormFieldModule, MatInputModule,
  MatButtonModule, MatTabsModule, MatCardModule } from '@angular/material'
import { TrumbowygModule } from 'ng2-lazy-trumbowyg'
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from 'angular2-schema-form'
import { SignaturePadModule } from 'angular2-signaturepad'

import { SharedModule } from 'app/shared/shared.module'

import { DocumentEditorDemoComponent } from './document-editor-demo.component'
import { DocumentTextEditorComponent } from './document-text-editor/document-text-editor.component'
import { DocumentFormComponent } from './document-form/document-form.component'
import { DocumentSchemaComponent } from './document-schema/document-schema.component'
import { DocumentSchemaFooterButtonsDirective } from './document-schema/document-schema-footer-buttons.directive'
import { SummernoteComponent } from './summernote/summernote.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TrumbowygModule,
    SchemaFormModule,
    SignaturePadModule,
    /** Material Modules */
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    /** Covalent Modules */
    CovalentCodeEditorModule,
    CovalentExpansionPanelModule,
    CovalentJsonFormatterModule
  ],
  declarations: [
    DocumentEditorDemoComponent,
    DocumentTextEditorComponent,
    DocumentFormComponent,
    DocumentSchemaComponent,
    DocumentSchemaFooterButtonsDirective,
    SummernoteComponent
  ]
})
export class DocumentEditorDemoModule { }
