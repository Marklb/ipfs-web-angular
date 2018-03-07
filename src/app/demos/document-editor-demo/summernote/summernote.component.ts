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
            ['paperSize', ['paperSize']],
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'listStyles', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video', 'nugget', 'template']],
            ['pagebreak', ['pagebreak']],
            // ['custom', ['findnreplace']],
            ['misc', ['print']],
            ['view', ['fullscreen', 'codeview', 'help']]
          ],
          popatmouse: false,
          popover: {
            image: [
              ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
              ['float', ['floatLeft', 'floatRight', 'floatNone']],
              ['remove', ['removeMedia']]
            ],
            link: [
              ['link', ['linkDialogShow', 'unlink']]
            ],
            table: [
              ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
              ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
              ['custom', ['tableHeader']]
            ],
            air: [
              ['color', ['color']],
              ['font', ['bold', 'underline', 'clear']],
              ['para', ['ul', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture']]
            ]
          },
          nugget: {
            list: [ // list of your nuggets
              '[[code nugget 1]]',
              '[[code nugget 2]]',
              '[[code nugget 2]]'
            ]
          },
          template: {
            path: '/assets/summernote/tpls', // path to your template folder

            /*
             * list of your templates
             * key is the html file name (without .html extension)
             * value is the label shown in the editor
             */
            list: {
                'label-success': 'Success label', // path is : /summernote/tpls/label-success.html
                'label-error': 'Error label'
            }
          }
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
    await this.loadExternalFilesService.loadFile('/assets/summernote/summernote-ext-print.js')
    await this.loadExternalFilesService.loadFile('/assets/summernote/summernote-ext-nugget.js')
    await this.loadExternalFilesService.loadFile('/assets/summernote/summernote-ext-template.js')
    await this.loadExternalFilesService.loadFile('/assets/summernote/summernote-list-styles.js')
    await this.loadExternalFilesService.loadFile('/assets/summernote/summernote-list-styles.css')
    await this.loadExternalFilesService.loadFile('/assets/summernote/summernote-pagebreak.js')
    await this.loadExternalFilesService.loadFile('/assets/summernote/summernote-paper-size.js')
    await this.loadExternalFilesService.loadFile('/assets/summernote/summernote-table-headers.js')
    // await this.loadExternalFilesService.loadFile('/assets/summernote/summernote-text-findnreplace.js')
    // await this.loadExternalFilesService.loadFile('/assets/summernote/.js')
    // await this.loadExternalFilesService.loadFile('/assets/summernote/.js')
    // await this.loadExternalFilesService.loadFile('/assets/summernote/.js')
    // await this.loadExternalFilesService.loadFile('/assets/summernote/.js')

    this.loading = false
  }

  public save() {
    const element = document.querySelector('.note-editable')
    html2pdf(element, {
      margin:       0,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { dpi: 192, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    })
  }

}
