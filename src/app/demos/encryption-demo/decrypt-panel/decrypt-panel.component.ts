import { Component, OnInit, Input } from '@angular/core'
import { IpfsService } from 'app/services/ipfs.service'
import { CryptoService } from 'app/services/crypto/crypto.service'
import { StoredKeysService } from 'app/services/stored-keys.service'
import * as fileType from 'file-type'

interface IpfsAddedFile {
  path: string,
  hash: string,
  size: number,
}

@Component({
  selector: 'app-decrypt-panel',
  templateUrl: './decrypt-panel.component.html',
  styleUrls: ['./decrypt-panel.component.scss']
})
export class DecryptPanelComponent implements OnInit {

  @Input('encryptedFiles')
  public encryptedFiles: any[] = []

  public keys: any[] = []
  public selectedKey: any

  public alerts: any = []

  constructor(private ipfsService: IpfsService,
              private cryptoService: CryptoService,
              private storedKeysService: StoredKeysService) { }

  ngOnInit() {
    this.storedKeysService.storedKeys.subscribe((keys) => {
      this.keys = keys
    })
  }

  public viewFile(file: IpfsAddedFile) {
    const url = this.ipfsService.getGatewayUrl(file.hash)
    window.open(url, '_blank', 'resizable,scrollbars,status')
  }

  public async viewFileDecrypted(file: any): Promise<any> {
    const res = await this.ipfsService.ipfs.files.get(file.hash)
    const contentBuffer = res[0].content
    const fileContentBuffer = contentBuffer
    // console.log('fileContentBuffer: ', { data: fileContentBuffer })

    // console.log('fileType: ', fileType(fileContentBuffer))

    // const resultTest = await this.cryptoService.decrypt(fileContentBuffer, this.selectedKey)
    // const file1 = new Blob([resultTest], { type: 'application/pdf' })
    // // const file1 = new Blob([resultTest], { type: 'application/octet-stream' })
    // const fileURL = URL.createObjectURL(file1)
    // // console.log('fileURL: ', fileURL)
    // window.open(fileURL)
    // // window.open(fileURL, 'testfile')
    // // window.open(fileURL, '_blank', 'resizable,scrollbars,status')
    // // window.open(fileURL, 'something.pdf', 'resizable,scrollbars,status')

    let decryptedBuffer
    let decryptError = false
    try {
      const keyPassphrase = 'theseam'
      decryptedBuffer = await this.cryptoService.decrypt(fileContentBuffer,
        this.selectedKey.keys.private, keyPassphrase)
      console.log('decryptedBuffer: ', decryptedBuffer)
    } catch (err) {
      // console.error('err: ', err)
      decryptError = true
      this.alerts.push({
        type: 'danger',
        msg: `Unable to decrypt: ${file.hash}`,
        timeout: 5000,
        dismissible: true
      })
    }
    if (!decryptError) {
      // const resultTest = await this.cryptoService.decrypt(fileContentBuffer, this.selectedKey)
      const file1 = new Blob([decryptedBuffer], { type: 'application/pdf' })
      // const file1 = new Blob([decryptedBuffer], { type: 'application/octet-stream' })
      const fileURL = URL.createObjectURL(file1)
      // console.log('fileURL: ', fileURL)
      window.open(fileURL)
      // window.open(fileURL, 'testfile')
      // window.open(fileURL, '_blank', 'resizable,scrollbars,status')
      // window.open(fileURL, 'something.pdf', 'resizable,scrollbars,status')
    }
  }

  public async openFileDecrypted(file: any): Promise<any> {
    const res = await this.ipfsService.ipfs.files.get(file.hash)
    const contentBuffer = res[0].content
    const fileContentBuffer = contentBuffer
    // console.log('fileContentBuffer: ', { data: fileContentBuffer })

    let decryptedBuffer
    let decryptError = false
    try {
      const keyPassphrase = 'theseam'
      decryptedBuffer = await this.cryptoService.decrypt(fileContentBuffer,
        this.selectedKey.keys.private, keyPassphrase)
      console.log('decryptedBuffer: ', decryptedBuffer)
    } catch (err) {
      // console.error('err: ', err)
      decryptError = true
      this.alerts.push({
        type: 'danger',
        msg: `Unable to decrypt: ${file.hash}`,
        timeout: 5000,
        dismissible: true
      })
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

}
