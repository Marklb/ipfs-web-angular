import { Component, OnInit, ViewChild } from '@angular/core'
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-jspdf-demo',
  templateUrl: './jspdf-demo.component.html',
  styleUrls: ['./jspdf-demo.component.scss']
})
export class JspdfDemoComponent implements OnInit {

  @ViewChild('pdfPreviewContainer') _pdfPreviewContainer

  constructor() { }

  ngOnInit() {
    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.text(15, 25, 'Name: ')
    doc.text(15, 35, 'Address: ')
    doc.text(15, 45, 'City: ')
    doc.text(15, 55, 'State: ')
    doc.text(15, 65, 'Zip: ')

    let s = 'Voluptate sint nostrud labore ullamco aute amet mollit pariatur aute officia quis id est ipsum. Reprehenderit ad duis nostrud adipisicing proident enim aliquip sit tempor deserunt. Magna cillum officia culpa culpa esse veniam.'
    doc.text(15, 75, s)

    doc.setFontSize(10)
    const splitTitle = doc.splitTextToSize(s, 180)
    doc.text(15, 85, splitTitle)

    // console.dir(doc.output('Something'))
    // console.log()

    console.dir(this._pdfPreviewContainer)
    const pdfPreviewIFrame = document.createElement('iframe')
    pdfPreviewIFrame.frameBorder = '0'
    pdfPreviewIFrame.style.width = '100%'
    pdfPreviewIFrame.style.height = '800px'
    pdfPreviewIFrame.style.margin = '0'
    pdfPreviewIFrame.src = doc.output('datauristring') // arraybuffer, blob, dataurlnewwindow
    this._pdfPreviewContainer.nativeElement.appendChild(pdfPreviewIFrame)
  }

}
