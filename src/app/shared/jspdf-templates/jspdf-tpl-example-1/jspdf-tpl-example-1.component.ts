import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core'
import * as jsPDF from 'jspdf'

export interface IJspdfTplExample1Model {
  name: string
  address: string
  city: string
  state: string
  zip: string
}

@Component({
  selector: 'app-jspdf-tpl-example-1',
  templateUrl: './jspdf-tpl-example-1.component.html',
  styleUrls: ['./jspdf-tpl-example-1.component.scss']
})
export class JspdfTplExample1Component implements OnInit, OnDestroy {

  private _inpModel: IJspdfTplExample1Model

  @Input('inpModel')
  set inpModel(val: IJspdfTplExample1Model) {
    this._inpModel = val
    this.createPDF()
  }
  get inpModel() {
    return this._inpModel
  }

  // @Output() onPdfCreated = new EventEmitter<any>()

  @ViewChild('pdfPreviewContainer') _pdfPreviewContainer

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    const prevIframe = this._pdfPreviewContainer.nativeElement.querySelectorAll('iframe')
    if (prevIframe.length > 0) {
      for (let i = 0; i < prevIframe.length; i++) {
        const prev = prevIframe[i]
        this._pdfPreviewContainer.nativeElement.removeChild(prev)
      }
    }
  }

  public async createPDF() {
    if (!this._inpModel) { return }

    console.log('createPDF: ', this._inpModel)

    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.text(15, 25, `Name: ${this._inpModel.name}`)
    doc.text(15, 35, `Address: ${this._inpModel.address}`)
    doc.text(15, 45, `City: ${this._inpModel.city}`)
    doc.text(15, 55, `State: ${this._inpModel.state}`)
    doc.text(15, 65, `Zip: ${this._inpModel.zip}`)

    // let s = 'Nulla cupidatat magna labore voluptate nisi sint in qui Lorem elit. Lorem elit quis nulla quis sunt consequat cillum occaecat nostrud minim anim ad aliqua sit. Reprehenderit sunt cillum laboris adipisicing ut velit deserunt tempor.'
    // // doc.text(15, 75, s)

    // doc.setFontSize(10)
    // const splitTitle = doc.splitTextToSize(s, 180)
    // doc.text(15, 85, splitTitle)

    // console.dir(doc.output('Something'))
    // console.log()

    console.dir(this._pdfPreviewContainer)
    const pdfPreviewIFrame = document.createElement('iframe')
    pdfPreviewIFrame.frameBorder = '0'
    pdfPreviewIFrame.style.width = '100%'
    pdfPreviewIFrame.style.height = '800px'
    pdfPreviewIFrame.style.margin = '0'
    pdfPreviewIFrame.src = doc.output('datauristring') // arraybuffer, blob, dataurlnewwindow

    const prevIframe = this._pdfPreviewContainer.nativeElement.querySelectorAll('iframe')
    if (prevIframe.length > 0) {
      for (let i = 0; i < prevIframe.length; i++) {
        const prev = prevIframe[i]
        this._pdfPreviewContainer.nativeElement.removeChild(prev)
      }
    }

    this._pdfPreviewContainer.nativeElement.appendChild(pdfPreviewIFrame)
  }

}
