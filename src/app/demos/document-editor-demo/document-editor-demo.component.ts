import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation,
  ComponentRef, ViewContainerRef, ComponentFactoryResolver, AfterViewInit,
  OnDestroy, NgZone } from '@angular/core'
import * as jsPDF from 'jspdf'
import { SignaturePad } from 'angular2-signaturepad/signature-pad'
import * as interact from 'interactjs'
// const interact: any = _interact
// declare var interact: Function

@Component({
  selector: 'app-document-editor-demo',
  templateUrl: './document-editor-demo.component.html',
  styleUrls: ['./document-editor-demo.component.scss'],
})
export class DocumentEditorDemoComponent implements OnInit, AfterViewInit {

  public initialContentTwo: string = `<h2>This is an initial title Two.</h2><p>This is an initial content.</p><p><br></p><p><br></p>`
  public contentTwo: string
  public options: any = {
    autogrow: true,
    removeformatPasted: true,
    semantic: false,
    // imageWidthModalEdit: true,
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

  @ViewChild(SignaturePad) signaturePad: SignaturePad

  private signaturePadOptions: Object = {
    // 'minWidth': 0.5,
    // 'maxWidth': 2.5,
    'canvasWidth': 500,
    'canvasHeight': 300
  }

  @ViewChild('docEditor')
  public docEditor: any

  constructor(public zone: NgZone) { }

  ngOnInit() {
    this.jsonEditorSchema = JSON.stringify(this.mySchema, null, 2)
    this.jsonEditorModel = JSON.stringify(this.myModel, null, 2)
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    // this.signaturePad.set('minWidth', 5) // set szimek/signature_pad options at runtime
    this.signaturePad.clear() // invoke functions from szimek/signature_pad API
  }

  public drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL())
  }

  public drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    // console.log('begin drawing')
  }

  public updateSchema() {
    this.mySchema = JSON.parse(this.jsonEditorSchema)
    this.myModel = JSON.parse(this.jsonEditorModel)
  }

  public testImgClick() {
    console.log('this.docEditor: ', this.docEditor)
    const imgs = this.docEditor.trumbowygEl[0].querySelectorAll('.trumbowyg-editor img')
    console.log('imgs: ', imgs)


    // this.zone.runOutsideAngular(() => {
      const dragMoveListener = (event) => {
        const target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

        // translate the element
        target.style.webkitTransform =
        target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)'

        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      }

      console.log(interact)
      // console.log(interact('.trumbowyg-editor img'))
      const elem: any = (<Function>interact)('.trumbowyg-editor img')
      console.log(elem)
      // target elements with the "draggable" class
      // interact('.draggable')
      // interact('.trumbowyg-editor img')

      console.log(elem.draggable)
      const f = elem.draggable
      console.log(f)
      f({
        onmove: function() { console.log('move') }
      })
      // elem
      // .draggable({
      //   // enable inertial throwing
      //   inertia: true,
      //   // keep the element within the area of it's parent
      //   restrict: {
      //     restriction: 'parent',
      //     endOnly: true,
      //     elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      //   },
      //   // enable autoScroll
      //   autoScroll: true,

      //   // call this function on every dragmove event
      //   onmove: dragMoveListener,
      //   // call this function on every dragend event
      //   onend: (event) => {
      //     const textEl = event.target.querySelector('p')

      //     // if (textEl) {
      //     //   textEl.textContent = 'moved a distance of '
      //     //     + (Math.sqrt(Math.pow(event.pageX - event.x0, 2)
      //     //     + Math.pow(event.pageY - event.y0, 2) | 0)).toFixed(2) + 'px'
      //     // }
      //   }
      // })

      // this is used later in the resizing and gesture demos
      (<any>window).dragMoveListener = dragMoveListener

    // })
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
