import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { LoadExternalFilesService } from 'app/services/load-external-files.service'
import * as html2pdf from 'html2pdf.js'

declare const $: any

@Component({
  selector: 'app-summernote',
  templateUrl: './summernote.component.html',
  styleUrls: ['./summernote.component.scss']
})
export class SummernoteComponent implements OnInit {

  public loading: boolean = true

  @ViewChild('editor')
  public editor: ElementRef

  constructor(private loadExternalFilesService: LoadExternalFilesService) { }

  ngOnInit() {
    this._loadSummernote().then(() => {
      console.log('Summernote loaded')
      $(document).ready(function() {
        $('#summernote').summernote({
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['misc', ['print']],
            ['view', ['fullscreen', 'codeview', 'help']]
          ]
        })
      })
    })
  }

  private async _loadSummernote() {
    this.loading = true
    // await this.loadExternalFilesService.loadFile('/assets/summernote/summernote-bs4.css')
    // await this.loadExternalFilesService.loadFile('/assets/summernote/summernote-bs4.min.js')

    // await this.loadExternalFilesService.loadFile('http://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js')
    // await this.loadExternalFilesService.loadFile('http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote-bs4.css')
    // await this.loadExternalFilesService.loadFile('http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote-bs4.js')

    await this.loadExternalFilesService.loadFile('http://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js')
    await this.loadExternalFilesService.loadFile('http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote-lite.css')
    await this.loadExternalFilesService.loadFile('http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote-lite.js')
    await this.loadExternalFilesService.loadFile('/assets/summernote-ext-print.js')
    this.loading = false
  }

  public save() {
    const element = document.querySelector('.note-editable')
    html2pdf(element, {
      margin:       1,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { dpi: 192, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    })
  }

}
