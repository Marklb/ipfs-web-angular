import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation,
  ComponentRef, ViewContainerRef, ComponentFactoryResolver, AfterViewInit,
  OnDestroy } from '@angular/core'
import * as jsPDF from 'jspdf'


@Component({
  selector: 'app-document-editor-demo',
  templateUrl: './document-editor-demo.component.html',
  styleUrls: ['./document-editor-demo.component.scss'],
})
export class DocumentEditorDemoComponent implements OnInit {

  public initialContentTwo: string = `<h2>This is an initial title Two.</h2><p>This is an initial content.</p><p><br></p><p><br></p>`
  public contentTwo: string
  public options: any = {
    autogrow: true,
    removeformatPasted: true,
    semantic: false,
    imageWidthModalEdit: true,
    btns: [
      ['viewHTML'],
      ['undo', 'redo'], // Only supported in Blink browsers
      ['formatting'],
      ['strong', 'em', 'del'],
      ['superscript', 'subscript'],
      ['foreColor', 'backColor'],
      ['link'],
      ['insertImage'],
      ['base64'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
      ['unorderedList', 'orderedList'],
      ['horizontalRule'],
      ['preformatted'],
      ['noembed'],
      ['createPdf'],
      ['removeformat'],
      ['template'],
      ['fullscreen']
    ],
    btnsDef: {
      createPdf: {
        fn: () => {
          this.test({})
        },
        title: 'Create PDF',
        text: 'PDF',
        hasIcon: false
      }
    },
    plugins: {
      templates: [
        {
            name: 'Template 1',
            html: '<p>I am a template!</p>'
        },
        {
            name: 'Template 2',
            html: '<p>I am a different template!</p>'
        },
        {
          name: 'Name Insert',
          html: `<h2>This is the <strong>Name Insert</strong> template</h2>
            <p>My name is {var:name}</p>
            <p>Click the <strong>PDF</strong> button to create a PDF with the name
            <i>Mark</i> replaced with the name variable placeholder.</p>
          `
        }
    ]
    }
  }

  constructor() { }

  ngOnInit() {

  }

  public test2(event: any) {
    console.log('test event: ', event)
    // console.log('editor: ', this.editor)

    const doc = new jsPDF()

    // doc.setFontSize(20)
    // doc.text(15, 25, 'Name: ')
    // doc.text(15, 35, 'Address: ')
    // doc.text(15, 45, 'City: ')
    // doc.text(15, 55, 'State: ')
    // doc.text(15, 65, 'Zip: ')

    // const dUri = doc.output('datauristring') // arraybuffer, blob, dataurlnewwindow
    // console.log(dUri)
    // window.open(dUri)

    doc.save('Test.pdf')

    // const file1 = doc.output('blob') // arraybuffer, blob, dataurlnewwindow

    // // const file1 = new Blob([resultTest], { type: 'application/pdf' })
    // // const file1 = new Blob([resultTest], { type: 'application/octet-stream' })
    // const fileURL = URL.createObjectURL(file1)
    // // console.log('fileURL: ', fileURL)
    // window.open(fileURL)
    // // window.open(fileURL, 'testfile')
    // // window.open(fileURL, '_blank', 'resizable,scrollbars,status')
    // // window.open(fileURL, 'something.pdf', 'resizable,scrollbars,status')
  }

  public test(event: any) {
    // console.log('editor: ', this.editor)
    // const pdf = new jsPDF('p', 'pt', 'letter')
    const pdf = new jsPDF('p', 'pt', 'a4')
    // const pdf = new jsPDF()
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    // const source = this.editor.container
    // const source = this.view
    let source = this.contentTwo
    console.log(source)
    source = source.replace('{var:name}', 'Mark')

    // we support special element handlers. Register them with jQuery-style
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors
    // (class, of compound) at this time.
    const specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            console.log('element: ', element)
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
          'elementHandlers': specialElementHandlers
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



























// import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation,
//   ComponentRef, ViewContainerRef, ComponentFactoryResolver, AfterViewInit,
//   OnDestroy } from '@angular/core'
// import * as jsPDF from 'jspdf'
// import { EditorComponent } from './editor/editor.component'

// // import { EditorState } from 'prosemirror-state'
// // import { EditorView } from 'prosemirror-view'
// // import { Schema, DOMParser } from 'prosemirror-model'
// // import { schema } from 'prosemirror-schema-basic'
// // import { addListNodes } from 'prosemirror-schema-list'
// // import { exampleSetup } from 'prosemirror-example-setup'

// // import * as Quill from 'quill'
// // import { ImageDrop } from 'quill-image-drop-module'
// // import { ImageResize } from 'quill-image-resize-module'

// // Quill.register('modules/imageDrop', ImageDrop)
// // Quill.register('modules/imageResize', ImageResize)

// @Component({
//   selector: 'app-document-editor-demo',
//   templateUrl: './document-editor-demo.component.html',
//   styleUrls: ['./document-editor-demo.component.scss'],
//   // encapsulation: ViewEncapsulation.Native
// })
// export class DocumentEditorDemoComponent implements OnInit {

//   // editor: any

//   // @ViewChild('editorRef')
//   // public editorRef: ElementRef

//   // @ViewChild('contentRef')
//   // public contentRef: ElementRef

//   // public view: any

//   constructor() { }

//   ngOnInit() {
//     // // this.editor = new Quill('#editor', {
//     // //   modules: {
//     // //     toolbar: '#toolbar',
//     // //     imageDrop: true,
//     // //     imageResize: {}
//     // //   },
//     // //   theme: 'snow'
//     // // })

//     // // Mix the nodes from prosemirror-schema-list into the basic schema to
//     // // create a schema with list support.
//     // const mySchema = new Schema({
//     //   nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
//     //   marks: schema.spec.marks
//     // })

//     // this.view = new EditorView(this.editorRef.nativeElement, {
//     //   state: EditorState.create({
//     //     doc: DOMParser.fromSchema(mySchema).parse(this.contentRef.nativeElement),
//     //     plugins: exampleSetup({schema: mySchema})
//     //   })
//     // })
//   }

//   public test2(event: any) {
//     console.log('test event: ', event)
//     // console.log('editor: ', this.editor)

//     const doc = new jsPDF()

//     // doc.setFontSize(20)
//     // doc.text(15, 25, 'Name: ')
//     // doc.text(15, 35, 'Address: ')
//     // doc.text(15, 45, 'City: ')
//     // doc.text(15, 55, 'State: ')
//     // doc.text(15, 65, 'Zip: ')

//     // const dUri = doc.output('datauristring') // arraybuffer, blob, dataurlnewwindow
//     // console.log(dUri)
//     // window.open(dUri)

//     doc.save('Test.pdf')

//     // const file1 = doc.output('blob') // arraybuffer, blob, dataurlnewwindow

//     // // const file1 = new Blob([resultTest], { type: 'application/pdf' })
//     // // const file1 = new Blob([resultTest], { type: 'application/octet-stream' })
//     // const fileURL = URL.createObjectURL(file1)
//     // // console.log('fileURL: ', fileURL)
//     // window.open(fileURL)
//     // // window.open(fileURL, 'testfile')
//     // // window.open(fileURL, '_blank', 'resizable,scrollbars,status')
//     // // window.open(fileURL, 'something.pdf', 'resizable,scrollbars,status')
//   }

//   public test(event: any) {
//     // // console.log('editor: ', this.editor)
//     // // const pdf = new jsPDF('p', 'pt', 'letter')
//     // const pdf = new jsPDF('p', 'pt', 'a4')
//     // // const pdf = new jsPDF()
//     // // source can be HTML-formatted string, or a reference
//     // // to an actual DOM element from which the text will be scraped.
//     // // const source = this.editor.container
//     // const source = this.view

//     // // we support special element handlers. Register them with jQuery-style
//     // // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
//     // // There is no support for any other type of selectors
//     // // (class, of compound) at this time.
//     // const specialElementHandlers = {
//     //     // element with id of "bypass" - jQuery style selector
//     //     '#bypassme': function (element, renderer) {
//     //         // true = "handled elsewhere, bypass text extraction"
//     //         return true
//     //     }
//     // }

//     // // const margins = {
//     // //     top: 80,
//     // //     bottom: 60,
//     // //     left: 10,
//     // //     width: 700
//     // // }

//     // const margins = {
//     //     top: 10,
//     //     bottom: 60,
//     //     left: 10,
//     //     width: 575
//     // }

//     // // all coords and widths are in jsPDF instance's declared units
//     // // 'inches' in this case
//     // pdf.fromHTML(
//     //   source, // HTML string or DOM elem ref.
//     //   margins.left, // x coord
//     //   margins.top, { // y coord
//     //       'width': margins.width, // max width of content on PDF
//     //       // 'elementHandlers': specialElementHandlers
//     //   },

//     //   function (dispose) {
//     //       // dispose: object with X, Y of the last line add to the PDF
//     //       //          this allow the insertion of new lines after html
//     //       pdf.save('Test.pdf')

//     //       // dataurlnewwindow
//     //       // const dUri = pdf.output('datauristring') // arraybuffer, blob, dataurlnewwindow
//     //       // console.log(dUri)
//     //       // window.open(dUri, 'something.pdf', 'resizable,scrollbars,status')
//     //   },
//     //   margins
//     // )
//   }

// }





























// @Component({
//   selector: 'app-document-editor-demo',
//   templateUrl: './document-editor-demo.component.html',
//   styleUrls: ['./document-editor-demo.component.scss'],
//   // encapsulation: ViewEncapsulation.Native
// })
// export class DocumentEditorDemoComponent implements OnInit, AfterViewInit, OnDestroy {

//   @ViewChild('testIframe') iframe: ElementRef

//   doc: any
//   compRef: ComponentRef<EditorComponent>

//   constructor(private vcRef: ViewContainerRef,
//               private resolver: ComponentFactoryResolver) { }

//   createComponent() {
//     const compFactory = this.resolver.resolveComponentFactory(EditorComponent)
//     this.compRef = this.vcRef.createComponent(compFactory)

//     this.doc.body.appendChild(this.compRef.location.nativeElement)
//   }

//   ngOnInit() {

//   }

//   ngAfterViewInit() {
//     this.onLoadIframe() // in Firefox state is uninitialized while
//                    // in Chrome is complete so i use `load` event for Firefox
//   }

//   ngOnDestroy() {
//     if(this.compRef) {
//       this.compRef.destroy()
//     }
//   }

//   onLoadIframe() {
//     this.doc = this.iframe.nativeElement.contentDocument ||
//       this.iframe.nativeElement.contentWindow
//   }

// }
