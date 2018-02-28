import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { UploadEvent, UploadFile } from 'ngx-file-drop'
import { IpfsService, IPFSEnvironments } from 'app/services/ipfs.service'
import { StoredKeysService } from 'app/services/stored-keys.service'
import { Buffer as _Buffer } from 'buffer/'
import * as openpgp from 'openpgp'
import { CryptoService } from 'app/services/crypto/crypto.service'
import { readFileAsync } from 'app/utils/file-utils'

interface IpfsAddedFile {
  path: string,
  hash: string,
  size: number,
  signResults?: any[]
}

@Component({
  selector: 'app-digital-signature-demo',
  templateUrl: './digital-signature-demo.component.html',
  styleUrls: ['./digital-signature-demo.component.scss']
})
export class DigitalSignatureDemoComponent implements OnInit {

  public files: UploadFile[] = []
  public addedFiles: IpfsAddedFile[] = []

  public keys: any[] = []

  public selectedSigner: any

  public verifyCheckResult: any

  @ViewChild('filesInput') filesInput: ElementRef

  constructor(private ipfsService: IpfsService,
              private storedKeysService: StoredKeysService,
              private cryptoService: CryptoService) { }

  ngOnInit() {
    this.storedKeysService.storedKeys.subscribe((keys) => {
      this.keys = keys
    })
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

    const keyPassphrase = 'theseam'
    const signature = await this.cryptoService.sign(fileContent,
      this.selectedSigner.keys.private, keyPassphrase)

    const added1 = await this.ipfsService.ipfs.files.add([{
      path: file.name,
      content: fileContent
    }])

    const added2 = await this.ipfsService.ipfs.files.add([{
      path: 'sig_' + file.name,
      content: this.ipfsService.toIpfsBuffer(signature)
    }])

    this.addedFiles.push(added1[0])
    this.addedFiles.push(added2[0])
  }

  private async _getFileInfo(file: UploadFile): Promise<any> {
    return new Promise((resolve, reject) => {
      file.fileEntry.file(info => {
        resolve(info)
      })
    })
  }

  public async verifySignature(hash: string, sigHash: string) {
    const dataFile = await this.ipfsService.ipfs.files.get(hash)
    const sigFile = await this.ipfsService.ipfs.files.get(sigHash)

    const dataFileStr = dataFile[0].content.toString()
    const sigFileStr = sigFile[0].content.toString()

    const results = []
    for (const keyUser of this.keys) {
      const msg = dataFile[0].content
      const sig = sigFileStr
      const key = keyUser.keys.public

      const validity = await this.cryptoService.verify(msg, key, sig)

      results.push({
        name: keyUser.userIds[0].userId,
        valid: validity
      })
    }

    this.verifyCheckResult = {
      hash: hash,
      sigHash: sigHash,
      results: results
    }
  }

}
