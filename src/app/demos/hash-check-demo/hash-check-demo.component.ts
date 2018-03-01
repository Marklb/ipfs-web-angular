import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { UploadEvent, UploadFile } from 'ngx-file-drop'
import { IpfsService, IpfsEnvironment, IpfsConnection } from 'app/services/ipfs.service'
import * as _buffer from 'buffer/'
const _Buffer = _buffer.Buffer

@Component({
  selector: 'app-hash-check-demo',
  templateUrl: './hash-check-demo.component.html',
  styleUrls: ['./hash-check-demo.component.scss']
})
export class HashCheckDemoComponent implements OnInit {

  public docData: any = null
  public docDataStr: any = null
  public isGettingHash: boolean = false

  public files: UploadFile[] = []
  public filesForCheck: any = []

  @ViewChild('filesInput') filesInput: ElementRef

  constructor(private ipfsService: IpfsService) { }

  ngOnInit() { }

  public getDocData(hash: string) {
    this.docData = null
    this.isGettingHash = true
    // console.log('hash: ', hash)
    this.ipfsService.ipfs.files.get(hash)
    .then((res) => {
      // console.log('res: ', res)
      if (res.length > 0) {
        const data = res[0]
        // console.log('data: ', data)
        // console.log('data.content: ', data.content)
        // console.log(data.content.toString())
        // console.log(data.content.toJSON())
        // console.log(JSON.parse(data.content.toString()))
        this.docData = JSON.parse(data.content.toString())
        // console.log('this.docData: ', this.docData)
        this.docDataStr = null
        // this.docDataStr = JSON.stringify(this.docData, null, 2)
        // console.log('this.docDataStr: ', this.docDataStr)
        this.isGettingHash = false
      }
    })
    .catch((err) => {
      console.log('err: ', err)
      this.ipfsService.ipfs.object.get(hash)
      .then((obj) => {
        // console.log('obj: ', obj)
        // console.log('obj.toJSON(): ', obj.toJSON())
        // console.log('obj.toJSON().data: ', obj.toJSON().data)
        // console.log('obj.toJSON().data.toJSON(): ', obj.toJSON().data.toJSON())
        // this.docData = obj.toJSON().data.toString()
        this.docData = obj.toJSON().data
        this.docDataStr = obj.toJSON().data.toString()
        this.isGettingHash = false
      })
      .catch((err2) => {
        console.log('err2: ', err2)
        this.isGettingHash = false
      })
      // this.isGettingHash = false
    })
  }

  // public onDropFile(event: any) {
  //   this._stopAndPreventEventDefault(event)
  //   console.log('onDropFile event: ', event)
  // }

  // public onDragOver(event: any) {
  //   this._stopAndPreventEventDefault(event)
  //   // console.log('onDragOver event: ', event)
  // }

  // public onDragLeave(event: any) {
  //   this._stopAndPreventEventDefault(event)
  //   // console.log('onDragLeave event: ', event)
  // }

  // private _stopAndPreventEventDefault(event: any) {
  //   event.stopPropagation()
  //   event.preventDefault()
  // }

  public uploadFileBtnClick(event: any) {
    // console.log('uploadFileBtnClick')
    this.filesInput.nativeElement.click()
  }

  public fileInputChange(event: any) {
    // console.log('fileInputChange: ', event)
    // console.log('fileInputChange files: ', event.target.files)
    for (const file of event.target.files) {
      // console.log(file)
      this.addFileToIpfs(file).then((res) => {
        // console.log('res: ', res)
        this.filesForCheck.push(res)
      })
    }

  }

  public dropped(event: UploadEvent) {
    this.files = event.files

    for (const file of event.files) {
      // console.log('file: ', file)
      file.fileEntry.file(info => {
        // console.log('info: ', info)
        this.addFileToIpfs(info, file.fileEntry.fullPath).then((res) => {
          // console.log('res: ', res)
          this.filesForCheck.push(res)
        })
      })
    }
  }

  public fileOver(event) {
    // console.log(event)
  }

  public fileLeave(event) {
    // console.log(event)
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
        const ipfsConn: IpfsConnection = this.ipfsService.getIpfsConnection()
        const ipfsEnv: IpfsEnvironment = ipfsConn.environment
        if (ipfsEnv === IpfsEnvironment.Local) {
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

}
