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
      // ['table'],
      // ['insertImage'],
      // ['base64'],
      ['imageDropdown'],
      // ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
      ['justifyDropdown'],
      ['unorderedList', 'orderedList'],
      ['horizontalRule'],
      ['preformatted'],
      // ['noembed'],
      ['createPdf'],
      ['removeformat'],
      ['template'],
      ['fullscreen']
    ],
    btnsDef: {
      createPdf: {
        fn: () => { this.test({}) },
        title: 'Create PDF',
        text: 'PDF',
        hasIcon: false
      },
      justifyDropdown: {
        dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
        title: 'Justify Options',
        ico: 'justify-left',
        hasIcon: true
      },
      imageDropdown: {
        dropdown: ['insertImage', 'base64', 'noembed'],
        title: 'Media Insers',
        ico: 'insert-image',
        hasIcon: true
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

  mySchema = {
    'properties': {
      'email': {
        'type': 'string',
        'description': 'email',
        'format': 'email'
      },
      'password': {
        'type': 'string',
        'description': 'Password'
      },
      'rememberMe': {
        'type': 'boolean',
        'default': false,
        'description': 'Remember me'
      }
    },
    'required': ['email', 'password', 'rememberMe']
  }

  myModel = { email: 'john.doe@example.com' }

  public jsonEditorSchema: string
  public jsonEditorModel: string

  constructor() { }

  ngOnInit() {
    this.jsonEditorSchema = JSON.stringify(this.mySchema, null, 2)
    this.jsonEditorModel = JSON.stringify(this.myModel, null, 2)
  }

  public onClickJsonTest() {
    console.log('this.jsonEditorSchema: ', this.jsonEditorSchema)
    console.log('this.jsonEditorModel: ', this.jsonEditorModel)
  }

  public updateSchema() {
    this.mySchema = JSON.parse(this.jsonEditorSchema)
    this.myModel = JSON.parse(this.jsonEditorModel)
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
