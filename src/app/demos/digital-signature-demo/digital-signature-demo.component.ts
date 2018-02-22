import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { UploadEvent, UploadFile } from 'ngx-file-drop'
import { IpfsService, IPFSEnvironments } from 'app/services/ipfs.service'
import { StoredKeysService } from 'app/services/stored-keys.service'
import { Buffer as _Buffer } from 'buffer/'
import * as openpgp from 'openpgp'
import { CryptoService } from 'app/services/crypto.service'
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
      this.selectedSigner = keys[0]
    })
  }

  public dropped(event: UploadEvent) {
    this.files = event.files

    this.addFilesToIpfs(event.files, true)
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
    // console.log('fileData: ', fileData)
    const fileContent = this.ipfsService.toIpfsBuffer(fileData)

    const signed = await this.cryptoService.sign(fileContent, this.selectedSigner)

    // console.log('fileContent: ', fileContent)
    // console.log('signed.signature: ', signed.signature)

    const added1 = await this.ipfsService.ipfs.files.add([{
      path: file.name,
      content: fileContent
    }])

    const added2 = await this.ipfsService.ipfs.files.add([{
      path: 'sig_' + file.name,
      content: this.ipfsService.toIpfsBuffer(signed.signature)
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

  public async testSign2(hash: string, sigHash: string) {
    console.log('testSign2 hash: ', hash)
    console.log('testSign2 sigHash: ', sigHash)
    const dataFile = await this.ipfsService.ipfs.files.get(hash)
    const sigFile = await this.ipfsService.ipfs.files.get(sigHash)

    // console.log('dataFile: ', dataFile)
    // console.log('sigFile: ', sigFile)

    // console.log('dataFile[0].content: ', dataFile[0].content)
    // console.log('sigFile[0].content: ', sigFile[0].content)

    const dataFileStr = dataFile[0].content.toString()
    const sigFileStr = sigFile[0].content.toString()

    // console.log('dataFileStr: ', dataFileStr)
    // console.log('sigFileStr: ', sigFileStr)

    const options = {
      // message: openpgp.message.read(_Buffer.from(dataFile[0].content)),
      message: openpgp.message.fromBinary(_Buffer.from(dataFile[0].content)),
      // message: openpgp.message.fromBinary(dataFile[0].content),
      // message: openpgp.message.fromText(dataFileStr), // input as Message object
      signature: openpgp.signature.readArmored(sigFileStr), // parse detached signature
      publicKeys: openpgp.key.readArmored(this.selectedSigner.keys.public).keys   // for verification
    }

    // const verified = await openpgp.verify(options)
    // console.log('verified: ', verified)
    // const validity = verified.signatures[0].valid // true
    // console.log('verified: ', verified)
    // if (validity) {
    //   console.log('signed by key id ' + verified.signatures[0].keyid.toHex())
    // } else {
    //   console.log('not signed by key id ' + verified.signatures[0].keyid.toHex())
    // }

    // options.publicKeys = openpgp.key.readArmored(this.keys[0].keys.public).keys
    // const verified2 = await openpgp.verify(options)
    // const validity2 = verified2.signatures[0].valid // true
    // if (validity2) {
    //   console.log('signed by key id ' + verified2.signatures[0].keyid.toHex())
    // } else {
    //   console.log('not signed by key id ' + verified2.signatures[0].keyid.toHex())
    // }

    // options.publicKeys = openpgp.key.readArmored(this.keys[1].keys.public).keys
    // const verified3 = await openpgp.verify(options)
    // const validity3 = verified3.signatures[0].valid // true
    // if (validity3) {
    //   console.log('signed by key id ' + verified3.signatures[0].keyid.toHex())
    // } else {
    //   console.log('not signed by key id ' + verified3.signatures[0].keyid.toHex())
    // }

    const results = []
    for (const keyUser of this.keys) {
      options.publicKeys = openpgp.key.readArmored(keyUser.keys.public).keys
      const verified = await openpgp.verify(options)
      const validity = verified.signatures[0].valid // true
      if (validity) {
        // console.log('signed by key id ' + verified.signatures[0].keyid.toHex())
      } else {
        // console.log('not signed by key id ' + verified.signatures[0].keyid.toHex())
      }
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
