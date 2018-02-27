import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { IJspdfTplExample1Model } from 'app/shared/jspdf-templates/jspdf-tpl-example-1/jspdf-tpl-example-1.component'
import { UploadEvent, UploadFile } from 'ngx-file-drop'
import { IpfsService, IPFSEnvironments } from 'app/services/ipfs.service'
import { StoredKeysService } from 'app/services/stored-keys.service'
import { Buffer as _Buffer } from 'buffer/'
import * as openpgp from 'openpgp'
import { CryptoService } from 'app/services/crypto.service'
import { readFileAsync } from 'app/utils/file-utils'
import { HttpClient } from '@angular/common/http'
import * as fileType from 'file-type'

interface IpfsAddedFile {
  path: string,
  hash: string,
  size: number,
}

declare var document: any
declare var window: any

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

  public rawTextData: any = []

  public encryptedFiles: any[] = []

  @ViewChild('filesInput') filesInput: ElementRef

  constructor(private ipfsService: IpfsService,
              private cryptoService: CryptoService,
              private storedKeysService: StoredKeysService,
              private http: HttpClient) { }

  ngOnInit() {
    this.storedKeysService.storedKeys.subscribe((keys) => {
      this.keys = keys
      this.selectedKey = keys[0]
    })
  }

  public onFileEncrypted(event: any) {
    this.encryptedFiles.push(event)
  }

  public dropped(event: UploadEvent) {
    this.files = event.files

    this.addFilesToIpfs(event.files, true)
    .catch(err => console.log(err))
  }

  public fileOver(event) { }
  public fileLeave(event) { }

  public fileInputChange(event: any) {
    // console.log('fileInputChange: ', event)
    // console.log('fileInputChange files: ', event.target.files)
    this.addFilesToIpfs(event.target.files)

  }

  public uploadFileBtnClick(event: any) {
    this.filesInput.nativeElement.click()
  }

  public viewFile(file: IpfsAddedFile) {
    const url = this.ipfsService.getGatewayUrl(file.hash)
    window.open(url, '_blank', 'resizable,scrollbars,status')
  }

  private async addFilesToIpfs(files: any, fromDrop: boolean = false): Promise<any> {
    for (const file of files) {
      if (fromDrop) {
        const info = await this._getFileInfo(file)
        await this.addFileToIpfs(info, file.relativePath)
      } else {
        await this.addFileToIpfs(file)
      }
    }
  }

  private async addFileToIpfs(file: any, filePath?: string): Promise<any> {
    const fileData = await readFileAsync(file)
    const fileContent = this.ipfsService.toIpfsBuffer(fileData)

    const encrypted = await this.cryptoService.encrypt(fileContent, this.selectedKey)
    const encryptedDataBuffer = _Buffer.from(encrypted)

    const added = await this.ipfsService.ipfs.files.add([{
      path: file.name,
      content: this.ipfsService.toIpfsBuffer(encryptedDataBuffer)
    }])

    this.addedFiles.push(added[0])
  }

  public async viewFileDecrypted(file: any): Promise<any> {
    const res = await this.ipfsService.ipfs.files.get(file.hash)
    const contentBuffer = res[0].content
    const fileContentBuffer = contentBuffer
    // console.log('fileContentBuffer: ', { data: fileContentBuffer })

    console.log('fileType: ', fileType(fileContentBuffer))

    const resultTest = await this.cryptoService.decrypt(fileContentBuffer, this.selectedKey)
    const file1 = new Blob([resultTest], { type: 'application/pdf' })
    // const file1 = new Blob([resultTest], { type: 'application/octet-stream' })
    const fileURL = URL.createObjectURL(file1)
    // console.log('fileURL: ', fileURL)
    window.open(fileURL)
    // window.open(fileURL, 'testfile')
    // window.open(fileURL, '_blank', 'resizable,scrollbars,status')
    // window.open(fileURL, 'something.pdf', 'resizable,scrollbars,status')
  }

  public async openFileDecrypted(file: any): Promise<any> {
    const res = await this.ipfsService.ipfs.files.get(file.hash)
    const contentBuffer = res[0].content
    const fileContentBuffer = contentBuffer
    // console.log('fileContentBuffer: ', { data: fileContentBuffer })

    let decryptedBuffer
    let decryptError = false
    try {
      decryptedBuffer = await this.cryptoService.decrypt(fileContentBuffer, this.selectedKey)
      // console.log('decryptedBuffer: ', decryptedBuffer)
    } catch (err) {
      console.error('err: ', err)
      decryptError = true
    }
    if (!decryptError) {
      // const resultTest = await this.cryptoService.decrypt(fileContentBuffer, this.selectedKey)
      // const file1 = new Blob([decryptedBuffer], { type: 'application/pdf' })
      const file1 = new Blob([decryptedBuffer], { type: 'application/octet-stream' })
      const fileURL = URL.createObjectURL(file1)
      // console.log('fileURL: ', fileURL)
      window.open(fileURL)
      // window.open(fileURL, 'testfile')
      // window.open(fileURL, '_blank', 'resizable,scrollbars,status')
      // window.open(fileURL, 'something.pdf', 'resizable,scrollbars,status')
    }
  }

  private async _getFileInfo(file: UploadFile): Promise<any> {
    return new Promise((resolve, reject) => {
      file.fileEntry.file(info => {
        resolve(info)
      })
    })
  }

}
