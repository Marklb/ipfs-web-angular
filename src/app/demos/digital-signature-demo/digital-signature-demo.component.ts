import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
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

        if (this.selectedSigner) {
          this.cryptoService.sign(fileData[0].content, this.selectedSigner)
          .then((signed) => {
            // console.log(signed)
            const signedDataBuffer = _Buffer.from(signed.data)
            // console.log('signedDataBuffer: ', signedDataBuffer)
            fileData[0].content = signedDataBuffer
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

  // private async verifyData(cleartext: any, signer: any): Promise<any> {
  //   // console.log('verifyData cleartext: ', cleartext)
  //   const options = {
  //     message: openpgp.cleartext.readArmored(cleartext), // parse armored message
  //     publicKeys: openpgp.key.readArmored(signer.keys.public).keys   // for verification
  //   }

  //   return openpgp.verify(options).then(function(verified) {
  //     const validity = verified.signatures[0].valid // true
  //     // if (validity) {
  //     //   console.log('signed by key id ' + verified.signatures[0].keyid.toHex())
  //     // } else {
  //     //   console.log('not signed by key id ' + verified.signatures[0].keyid.toHex())
  //     // }
  //     return verified
  //   })
  // }

  public async verifyFile(file: any): Promise<any> {
    // console.log('verifyFile: ', file)
    const res = await this.ipfsService.ipfs.files.get(file.hash)
    // console.log('res: ', res)
    const fileContentBuffer = res[0].content
    // console.log('fileContentBuffer: ', fileContentBuffer)
    const fileContentStr = fileContentBuffer.toString('binary')
    // console.log('fileContentStr: ', fileContentStr)

    // const verifiedMark = await this.verifyData(fileContentStr, this.keys[0])
    const verifiedMark = await this.cryptoService.verify(fileContentStr, this.keys[0])
    const validityMark = verifiedMark.signatures[0].valid // true
    console.log('validityMark: ', validityMark)

    const verifiedEric = await this.cryptoService.verify(fileContentStr, this.keys[1])
    const validityEric = verifiedEric.signatures[0].valid // true
    console.log('validityEric: ', validityEric)

    file.signResults = [
      { name: this.keys[0].userIds[0].name, valid: validityMark || false },
      { name: this.keys[1].userIds[0].name, valid: validityEric || false }
    ]
  }

  public testSign() {
    this.cryptoService.sign('', this.selectedSigner)
  }


}
