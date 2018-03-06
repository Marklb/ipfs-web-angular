import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation,
  ComponentRef, ViewContainerRef, ComponentFactoryResolver, AfterViewInit,
  OnDestroy, NgZone } from '@angular/core'
import * as jsPDF from 'jspdf'
import { SignaturePad } from 'angular2-signaturepad/signature-pad'
import * as interact from 'interactjs'

declare const jQuery: any

const resizimg = {
  init: function (trumbowyg) {
    const $ = jQuery

    const defaultOptions = {
      minSize: 32,
      step: 4
    }

    const preventDefault = function (ev) {
      return ev.preventDefault()
    }

    trumbowyg.o.plugins.resizimg = $.extend(true, {},
        defaultOptions,
        trumbowyg.o.plugins.resizimg || {},
        {
            resizable: {
                resizeWidth: false,
                onDragStart: function (ev, $el) {
                  const opt = trumbowyg.o.plugins.resizimg
                  const x = ev.pageX - $el.offset().left
                  const y = ev.pageY - $el.offset().top
                  if (x < $el.width() - opt.minSize || y < $el.height() - opt.minSize) {
                      return false
                  }
                },
                onDrag: function (ev, $el, newWidth, newHeight) {
                  const opt = trumbowyg.o.plugins.resizimg
                  if (newHeight < opt.minSize) {
                      newHeight = opt.minSize
                  }
                  newHeight -= newHeight % opt.step
                  $el.height(newHeight)
                  return false
                },
                onDragEnd: function () {
                  trumbowyg.$c.trigger('tbwchange')
                }
            }
        }
    )

    function initResizable() {
        trumbowyg.$ed.find('img:not(.resizable)')
            .resizable(trumbowyg.o.plugins.resizimg.resizable)
            .on('mousedown', preventDefault)
    }

    function destroyResizable() {
        trumbowyg.$ed.find('img.resizable')
            .resizable('destroy')
            .off('mousedown', preventDefault)
            .removeClass('resizable')
        trumbowyg.syncTextarea()
    }

    trumbowyg.$c.on('tbwinit', () => { console.log('tbwinit'); initResizable() })
    trumbowyg.$c.on('tbwfocus', () => { console.log('tbwfocus'); initResizable() })
    trumbowyg.$c.on('tbwchange', () => { console.log('tbwchange'); initResizable() })
    trumbowyg.$c.on('tbwblur', () => { console.log('tbwblur'); destroyResizable() })
    trumbowyg.$c.on('tbwclose', () => { console.log('tbwclose'); destroyResizable() })
  }
}

const interactjsPlugin = {
  init: function (trumbowyg) {
    const $ = jQuery

    const defaultOptions = {
      minSize: 32,
      step: 4
    }

    const preventDefault = function (ev) {
      return ev.preventDefault()
    }

    function dragMoveListener (event) {
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

    trumbowyg.o.plugins.interactjs = $.extend(true, {},
        defaultOptions,
        trumbowyg.o.plugins.interactjs || {},
        {
            interact: {
              // enable inertial throwing
              inertia: true,
              // keep the element within the area of it's parent
              restrict: {
                restriction: 'parent',
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
              },
              // enable autoScroll
              autoScroll: true,

              // call this function on every dragmove event
              onmove: dragMoveListener,
              // call this function on every dragend event
              onend: function (event) {
                // const textEl = event.target.querySelector('p');
                // if (textEl) {
                //   textEl.textContent =
                //   'moved a distance of '
                //   + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                //                Math.pow(event.pageY - event.y0, 2) | 0))
                //       .toFixed(2) + 'px'
                // }
              }
            }
        }
    )

    function initResizable() {
      trumbowyg.$ed.find('img:not(.interactable)')
          .on('mousedown', preventDefault)
          .addClass('interactable')

      const elems = interact('img.interactable')
      console.log(elems)
      elems
        .draggable(trumbowyg.o.plugins.interactjs.interact)

      // trumbowyg.$ed.find('img:not(.resizable)')
      //     .resizable(trumbowyg.o.plugins.interactjs.resizable)
      //     .on('mousedown', preventDefault)
    }

    function destroyResizable() {
        // trumbowyg.$ed.find('img.resizable')
        //     .resizable('destroy')
        //     .off('mousedown', preventDefault)
        //     .removeClass('resizable')
        trumbowyg.syncTextarea()
    }

    trumbowyg.$c.on('tbwinit', () => { console.log('tbwinit'); initResizable() })
    trumbowyg.$c.on('tbwfocus', () => { console.log('tbwfocus'); initResizable() })
    trumbowyg.$c.on('tbwchange', () => { console.log('tbwchange'); initResizable() })
    trumbowyg.$c.on('tbwblur', () => { console.log('tbwblur'); destroyResizable() })
    trumbowyg.$c.on('tbwclose', () => { console.log('tbwclose'); destroyResizable() })
  }
}

@Component({
  selector: 'app-document-text-editor',
  templateUrl: './document-text-editor.component.html',
  styleUrls: ['./document-text-editor.component.scss']
})
export class DocumentTextEditorComponent implements OnInit {

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
        title: 'Media Insert',
        ico: 'insert-image',
        hasIcon: true
      }
    },
    plugins: {
      resizimg: {},
      interactjs: {},
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

  @ViewChild('docEditor')
  public docEditor: any

  constructor(public zone: NgZone) { }

  ngOnInit() {
    const win = (<any>window)
    const waitForDefined = () => {
      if (!win.jQuery) {
        setTimeout(waitForDefined, 30)
      } else {
        // this.loadFile('/assets/trumbowyg.resizimg.js')
        this.loadFile('https://rawgit.com/RickStrahl/jquery-resizable/master/src/jquery-resizable.js')
        .then(() => {
          console.log('Done loading jquery-resizable')
        })
      }
    }
    setTimeout(waitForDefined, 30)
  }

  public testImgClick() {
    const win = (<any>window)
    // console.log('jQuery.trumbowyg: ', win.jQuery.trumbowyg)
    // console.log('jQuery.trumbowyg: ', win.jQuery('trumbowyg'))
    // testPlugin.init(win.jQuery.trumbowyg, this.docEditor.trumbowygEl)
    const trum = win.jQuery(this.docEditor.trumbowygEl).data('trumbowyg')
    resizimg.init(trum)
    // interactjsPlugin.init(trum)
    // console.log('jQuery.trumbowyg: ', win.jQuery.trumbowyg)
  }

  public testImgClick2() {
    // const win = (<any>window)
    // const waitForDefined = () => {
    //   console.log('~jQuery: ', win.jQuery)
    //   if (!win.jQuery) {
    //     setTimeout(waitForDefined, 30)
    //   } else {
    //     console.log('window.jQuery: ', win.jQuery)
    //     this.loadFile('https://rawgit.com/RickStrahl/jquery-resizable/master/dist/jquery-resizable.min.js')
    //     .then(() => { this.loadFile('/assets/trumbowyg.resizimg.js') })
    //   }
    // }
    // setTimeout(waitForDefined, 30)


    // console.log('jQuery: ', jQuery)

    // console.log('this.docEditor: ', this.docEditor)
    // const imgs = this.docEditor.trumbowygEl[0].querySelectorAll('.trumbowyg-editor img')
    // console.log('imgs: ', imgs)
    // const img = imgs[0]
    // img.classList.add('dragging-box')

    // img.addEventListener('click', (event) => {
    //   console.log('event: ', event)
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
    console.log(this.docEditor.trumbowygEl[0])
    // let source = this.contentTwo
    const source = this.docEditor.trumbowygEl[0]
    console.log(source)
    // source = source.replace('{var:name}', 'Mark')

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

  private loadFile(path: string) {

    return new Promise<any>((resolve, reject) => {
      let e: any
      if (/(^css!|\.css$)/.test(path)) {
        // css
        e = document.createElement('link')
        e.rel = 'stylesheet'
        e.href = path.replace(/^css!/, '')  // remove "css!" prefix
      } else {
        // javascript
        e = document.createElement('script')
        e.src = path
        e.async = true
      }
      document.getElementsByTagName('head')[0].appendChild(e)

      e.onload = () => {
        resolve()
      }
      e.onerror = (err: any) => reject(new Error('Files not found.'))
    })
  }

}
