import { Component, OnInit } from '@angular/core'
import * as Quill from 'quill'

@Component({
  selector: 'app-document-editor-demo',
  templateUrl: './document-editor-demo.component.html',
  styleUrls: ['./document-editor-demo.component.scss']
})
export class DocumentEditorDemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const editor = new Quill('#editor', {
      modules: { toolbar: '#toolbar' },
      theme: 'snow'
    })
  }

}
