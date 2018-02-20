import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { IJspdfTplExample1Model } from 'app/shared/jspdf-templates/jspdf-tpl-example-1/jspdf-tpl-example-1.component'
import { UploadEvent, UploadFile } from 'ngx-file-drop'
import { IpfsService, IPFSEnvironments } from 'app/services/ipfs.service'
import { StoredKeysService } from 'app/services/stored-keys.service'
import { Buffer as _Buffer } from 'buffer/'
import * as openpgp from 'openpgp'
import { CryptoService } from 'app/services/crypto.service'

interface IpfsAddedFile {
  path: string,
  hash: string,
  size: number,
}

@Component({
  selector: 'app-encryption-demo',
  templateUrl: './encryption-demo.component.html',
  styleUrls: ['./encryption-demo.component.scss']
})
export class EncryptionDemoComponent implements OnInit {

  public files: UploadFile[] = []
  public addedFiles: IpfsAddedFile[] = []

  public keys: any[] = []

  public selectedKey: any

  @ViewChild('filesInput') filesInput: ElementRef

  constructor(private ipfsService: IpfsService,
              private cryptoService: CryptoService,
              private storedKeysService: StoredKeysService) { }

  ngOnInit() {
    this.storedKeysService.storedKeys.subscribe((keys) => {
      this.keys = keys
      this.selectedKey = keys[0]
    })
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
    // window.open(url, '_blank')
    window.open(url, '_blank', 'resizable,scrollbars,status')
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
        console.log('reader.result', reader.result, file)

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

        if (this.selectedKey) {
          // this.encryptData(fileData[0].content, this.selectedKey)
          this.cryptoService.encrypt(fileData[0].content, this.selectedKey)
          .then((encrypted) => {
            // console.log(encrypted)
            // const encryptedDataBuffer = _Buffer.from(encrypted.data)
            const encryptedDataBuffer = _Buffer.from(encrypted)
            // console.log('encryptedDataBuffer: ', encryptedDataBuffer)
            fileData[0].content = encryptedDataBuffer
            this.ipfsService.ipfs.files.add(fileData)
            .then(addResult => {
              // console.log('addResult: ', addResult)
              resolve(addResult[0])
            })
          })
        } else {
          this.ipfsService.ipfs.files.add(fileData)
          .then(addResult => {
            // console.log('addResult: ', addResult)
            resolve(addResult[0])
          })
        }
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
      })
    })
  }

  public async viewFileDecrypted(file: any): Promise<any> {
    const res = await this.ipfsService.ipfs.files.get(file.hash)
    const fileContentBuffer = res[0].content

    const plaintext = await this.cryptoService.decrypt(fileContentBuffer, this.selectedKey)
    const dataBuffer = _Buffer.from(plaintext.data)
    console.log('dataBuffer: ', dataBuffer)

    const file1 = new Blob([dataBuffer], { type: 'application/pdf' })
    // const file1 = new Blob([dataBuffer], { type: 'application/text' })
    // const file1 = new Blob([dataBuffer], { type: 'application/octet-stream' })
    // const file1 = new Blob([dataBuffer])
    const fileURL = URL.createObjectURL(file1)
    console.log('fileURL: ', fileURL)
    window.open(fileURL)
    // window.open(fileURL, 'testfile')
    // window.open(fileURL, '_blank', 'resizable,scrollbars,status')
    // window.open(fileURL, 'something.pdf', 'resizable,scrollbars,status')
  }

}
