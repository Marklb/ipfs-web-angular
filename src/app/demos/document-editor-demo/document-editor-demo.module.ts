import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { TrumbowygModule } from 'ng2-lazy-trumbowyg'
import { CovalentCodeEditorModule } from '@covalent/code-editor'
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from 'angular2-schema-form'
import { SignaturePadModule } from 'angular2-signaturepad'

import { SharedModule } from 'app/shared/shared.module'

import { DocumentEditorDemoComponent } from './document-editor-demo.component'
import { DocumentTextEditorComponent } from './document-text-editor/document-text-editor.component'
import { DocumentFormComponent } from './document-form/document-form.component'
import { DocumentSchemaComponent } from './document-schema/document-schema.component'
import { DocumentSchemaFooterButtonsDirective } from './document-schema/document-schema-footer-buttons.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TrumbowygModule,
    CovalentCodeEditorModule,
    SchemaFormModule,
    SignaturePadModule
  ],
  declarations: [
    DocumentEditorDemoComponent,
    DocumentTextEditorComponent,
    DocumentFormComponent,
    DocumentSchemaComponent,
    DocumentSchemaFooterButtonsDirective
  ]
})
export class DocumentEditorDemoModule { }
