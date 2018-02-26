import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'

import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema, DOMParser } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'
import { exampleSetup } from 'prosemirror-example-setup'

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss']
})
export class DocumentEditorComponent implements OnInit {

  @ViewChild('editorRef')
  public editorRef: ElementRef

  @ViewChild('contentRef')
  public contentRef: ElementRef

  public view: any

  constructor() { }

  ngOnInit() {
    // this.editor = new Quill('#editor', {
    //   modules: {
    //     toolbar: '#toolbar',
    //     imageDrop: true,
    //     imageResize: {}
    //   },
    //   theme: 'snow'
    // })

    // Mix the nodes from prosemirror-schema-list into the basic schema to
    // create a schema with list support.
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks
    })

    this.view = new EditorView(this.editorRef.nativeElement, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(this.contentRef.nativeElement),
        plugins: exampleSetup({schema: mySchema})
      })
    })
  }

}