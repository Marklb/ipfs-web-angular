import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import * as jsPDF from 'jspdf'

import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema, DOMParser, HorizontalRule } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'
import { exampleSetup } from 'prosemirror-example-setup'
// import applyDevTools from 'prosemirror-dev-tools'

declare const ProseMirrorDevTools: any

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

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
    const modifiedSchema = { ...schema }
    // horizontal_rule: {type: HorizontalRule},
    modifiedSchema.nodes.horizontal_rule = { type: HorizontalRule }
    console.log(modifiedSchema)

    // Mix the nodes from prosemirror-schema-list into the basic schema to
    // create a schema with list support.
    const mySchema = new Schema({
      nodes: addListNodes(modifiedSchema.spec.nodes, 'paragraph block*', 'block'),
      marks: modifiedSchema.spec.marks
    })

    this.view = new EditorView(this.editorRef.nativeElement, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(this.contentRef.nativeElement),
        plugins: exampleSetup({schema: mySchema})
      })
    })

    ProseMirrorDevTools.applyDevTools(this.view, { EditorState: EditorState })
    // applyDevTools(this.view)
  }

  public testPDF(event: any) {
    console.log('testPDF: ', event)
    console.log(this.view.dom)

    // console.log('editor: ', this.editor)
    // const pdf = new jsPDF('p', 'pt', 'letter')
    const pdf = new jsPDF('p', 'pt', 'a4')
    // const pdf = new jsPDF()
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    // const source = this.editor.container
    const source = this.view.dom

    // we support special element handlers. Register them with jQuery-style
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors
    // (class, of compound) at this time.
    const specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    }

    // const margins = {
    //     top: 80,
    //     bottom: 60,
    //     left: 10,
    //     width: 700
    // }

    const margins = {
        top: 10,
        bottom: 60,
        left: 10,
        width: 575
    }

    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
      source, // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top, { // y coord
          'width': margins.width, // max width of content on PDF
          // 'elementHandlers': specialElementHandlers
      },

      function (dispose) {
          // dispose: object with X, Y of the last line add to the PDF
          //          this allow the insertion of new lines after html
          pdf.save('Test.pdf')

          // dataurlnewwindow
          // const dUri = pdf.output('datauristring') // arraybuffer, blob, dataurlnewwindow
          // console.log(dUri)
          // window.open(dUri, 'something.pdf', 'resizable,scrollbars,status')
      },
      margins
    )
  }

}
