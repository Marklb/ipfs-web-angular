import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core'
import { UploadEvent, UploadFile } from 'ngx-file-drop'

@Component({
  selector: 'app-files-drop-pick',
  templateUrl: './files-drop-pick.component.html',
  styleUrls: ['./files-drop-pick.component.scss']
})
export class FilesDropPickComponent implements OnInit {

  @ViewChild('filesInput') filesInput: ElementRef

  @Output('fileDrop')
  public fileDrop: EventEmitter<any> = new EventEmitter<any>()

  @Output('fileOver')
  public fileOver: EventEmitter<any> = new EventEmitter<any>()

  @Output('fileLeave')
  public fileLeave: EventEmitter<any> = new EventEmitter<any>()

  @Output('fileInputChange')
  public fileInputChange: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit() { }

  public _fileDrop(event: UploadEvent) { this.fileDrop.emit(event) }
  public _fileOver(event) { this.fileOver.emit(event) }
  public _fileLeave(event) { this.fileLeave.emit(event) }

  public _fileInputChange(event: any) { this.fileInputChange.emit(event) }

  public uploadFileBtnClick(event: any) {
    this.filesInput.nativeElement.click()
  }

  private async _getFileInfo(file: UploadFile): Promise<any> {
    return new Promise((resolve, reject) => {
      file.fileEntry.file(info => {
        resolve(info)
      })
    })
  }

}
