import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DocumentEditorDemoComponent } from './document-editor-demo.component'
import { EditorComponent } from './editor/editor.component'

@NgModule({
  imports: [
    CommonModule
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
