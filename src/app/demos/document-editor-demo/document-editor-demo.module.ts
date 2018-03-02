import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DocumentEditorDemoComponent } from './document-editor-demo.component'
import { EditorComponent } from './editor/editor.component'
import { TrumbowygModule } from 'ng2-lazy-trumbowyg'

@NgModule({
  imports: [
    CommonModule,
    TrumbowygModule
  ],
  declarations: [
    DocumentEditorDemoComponent,
    EditorComponent
  ],
  // entryComponents: [
  //   EditorComponent
  // ]
})
export class DocumentEditorDemoModule { }
