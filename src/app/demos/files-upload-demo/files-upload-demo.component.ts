import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { UploadEvent, UploadFile } from 'ngx-file-drop'
import { IpfsService, IPFSEnvironments } from 'app/services/ipfs.service'
import * as _buffer from 'buffer/'
const _Buffer = _buffer.Buffer

interface IpfsAddedFile {
  path: string,
  hash: string,
  size: number
}

@Component({
  selector: 'app-files-upload-demo',
  templateUrl: './files-upload-demo.component.html',
  styleUrls: ['./files-upload-demo.component.scss']
})
export class FilesUploadDemoComponent implements OnInit {

  public files: UploadFile[] = []
  public addedFiles: IpfsAddedFile[] = []

  @ViewChild('filesInput') filesInput: ElementRef

  constructor(private ipfsService: IpfsService) { }

  ngOnInit() {
  }

  public dropped(event: UploadEvent) {
    this.files = event.files

    this.addFilesToIpfs2(event.files)
    .catch(err => console.log(err))
  }

  public fileOver(event) {
    // console.log(event)
  }

  public fileLeave(event) {
    // console.log(event)
  }

  public previewFile(file: IpfsAddedFile) {

  }

  // public fileInputChange(event: any) {
  //   console.log('fileInputChange: ', event)
  // }

  // public fileInputChangeMulti(event: any) {
  //   console.log('fileInputChangeMulti: ', event)
  // }

  public fileInputChange(event: any) {
    console.log('fileInputChange: ', event)
    console.log('fileInputChange files: ', event.target.files)
    this.addFilesToIpfs(event.target.files)

  }

  public uploadFileBtnClick(event: any) {
    console.log('uploadFileBtnClick')
    this.filesInput.nativeElement.click()
  }

  public viewFile(file: IpfsAddedFile) {
    let url
    if (this.ipfsService.ipfsEnvironment === IPFSEnvironments.Browser) {
      url = `https://ipfs.io/ipfs/${file.hash}`
    } else {
      // url = `http://localhost:8080/ipfs/${file.hash}`
      url = `http://${this.ipfsService.ipfsConnection.address}:8080/ipfs/${file.hash}`
    }
    window.open(url, '_blank')
  }

  private async addFilesToIpfs(files: any): Promise<any> {
    for (const file of files) {
      // console.log(file)
      const addedFile = await this.addFileToIpfs(file)
      // console.log('addedFile: ', addedFile)
      this.addedFiles.push(addedFile)
    }
  }

  private async addFileToIpfs(file: any, filePath?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // console.log('file: ', file)
      const reader = new FileReader()
      reader.onload = () => {
        // console.log('reader.result', reader.result, file)

        let filename = file.name
        // if (file.hasOwnProperty('fullPath')) {
        if (filePath) {
          // console.log('set name: ', filePath)
          filename = filePath
        }

        let fileData
        if (this.ipfsService.ipfsEnvironment === IPFSEnvironments.Local) {
          fileData = [{
            path: filename,
            content: _Buffer.from(reader.result)
          }]
        } else {
          fileData = {
            path: filename,
            content: new this.ipfsService.ipfs.types.Buffer(reader.result)
          }
        }

        this.ipfsService.ipfs.files.add(fileData)
        .then(addResult => {
          // console.log('addResult: ', addResult)
          resolve(addResult[0])
        })
      }
      reader.readAsArrayBuffer(file)
    })
  }

  private async addFilesToIpfs2(files: UploadFile[]): Promise<any> {
    for (const file of files) {
      console.log(file)
      const addedFile = await this.addFileToIpfs2(file)
      // console.log('addedFile: ', addedFile)
      this.addedFiles.push(addedFile)
    }
  }

  private async addFileToIpfs2(file: UploadFile): Promise<any> {
    return new Promise((resolve, reject) => {
      file.fileEntry.file(info => {
        // console.log('info: ', info, file)
        this.addFileToIpfs(info, file.relativePath).then(res => {
          resolve(res)
        })
        // const reader = new FileReader()
        // reader.onload = () => {
        //   console.log('reader.result', reader.result)

        //   let fileData
        //   if (this.ipfsService.ipfsEnvironment === IPFSEnvironments.Local) {
        //     fileData = [{
        //       path: info.name,
        //       content: _Buffer.from(reader.result)
        //     }]
        //   } else {
        //     fileData = {
        //       path: info.name,
        //       content: new this.ipfsService.ipfs.types.Buffer(reader.result)
        //     }
        //   }

        //   this.ipfsService.ipfs.files.add(fileData)
        //   .then(addResult => {
        //     console.log('addResult: ', addResult)
        //     resolve(addResult[0])
        //   })
        // }
        // reader.readAsArrayBuffer(info)
      })
    })
  }

}
