import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { DocumentEditorDemoComponent } from './document-editor-demo.component'
import { TrumbowygModule } from 'ng2-lazy-trumbowyg'
import { DocumentTextEditorComponent } from './document-text-editor/document-text-editor.component'
import { DocumentFormComponent } from './document-form/document-form.component'
import { CovalentCodeEditorModule } from '@covalent/code-editor'
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from 'angular2-schema-form'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrumbowygModule,
    CovalentCodeEditorModule,
    SchemaFormModule
  ],
  declarations: [
    DocumentEditorDemoComponent,
    DocumentTextEditorComponent,
    DocumentFormComponent
  ]
})
export class DocumentEditorDemoModule { }
