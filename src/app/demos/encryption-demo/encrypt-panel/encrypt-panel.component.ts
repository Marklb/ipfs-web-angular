import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { UploadEvent, UploadFile } from 'ngx-file-drop'
import { Buffer as _Buffer } from 'buffer/'
import { IpfsService } from 'app/services/ipfs.service'
import { readFileAsync } from 'app/utils/file-utils'
import { CryptoService } from 'app/services/crypto.service'

interface IpfsAddedFile {
  path: string,
  hash: string,
  size: number,
}

enum FromType {
  Drop,
  Browse,
  Ipfs
}

interface IPendingEncryptFile {
  from: FromType
  name?: string
  path?: string
  size: number
  buffer: any
  extra: any
}

@Component({
  selector: 'app-encrypt-panel',
  templateUrl: './encrypt-panel.component.html',
  styleUrls: ['./encrypt-panel.component.scss']
})
export class EncryptPanelComponent implements OnInit {

  public selectedKeys: any = []
  public filesPending: IPendingEncryptFile[] = []

  @Output('fileEncrypted')
  public fileEncrypted: EventEmitter<any> = new EventEmitter<any>()

  constructor(private ipfsService: IpfsService,
              private cryptoService: CryptoService) { }

  ngOnInit() {
  }

  public onSelectedKeysChange(event: any) {
    // console.log('onSelectedKeysChange: ', event)
    this.selectedKeys = event.selectedKeys
  }

  public removePendingFile(file: IPendingEncryptFile) {
    this.filesPending = this.filesPending.filter(x => x !== file)
  }

  public async onFileDrop(event: any) {
    // console.log('onFileDrop: ', event)
    const files = event.files
    for (const file of files) {
      const info = await this._getFileInfo(file)
      const fileData = await readFileAsync(info)
      this.filesPending.push({
        from: FromType.Drop,
        name: info.name,
        path: file.relativePath,
        size: info.size,
        buffer: this.ipfsService.toIpfsBuffer(fileData),
        extra: file
      })
    }
  }

  public async onFileInputChange(event: any) {
    // console.log('onFileInputChange: ', event)
    const files = event.target.files
    for (const file of files) {
      const fileData = await readFileAsync(file)
      this.filesPending.push({
        from: FromType.Browse,
        name: file.name,
        size: file.size,
        buffer: this.ipfsService.toIpfsBuffer(fileData),
        extra: file
      })
    }
  }

  public async encryptFilesPending() {
    for (const file of this.filesPending) {
      const keys = this.selectedKeys.map(k => ({ keys: { public: k.keys.public } }))
      const encrypted = await this.cryptoService.encrypt(file.buffer, keys, file.name)
      const encryptedDataBuffer = _Buffer.from(encrypted)

      const added = await this.ipfsService.ipfs.files.add([{
        path: file.name,
        content: this.ipfsService.toIpfsBuffer(encryptedDataBuffer)
      }])

      this.fileEncrypted.emit(added[0])

      this.removePendingFile(file)
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
