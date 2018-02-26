import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { IJspdfTplExample1Model } from 'app/shared/jspdf-templates/jspdf-tpl-example-1/jspdf-tpl-example-1.component'
import { UploadEvent, UploadFile } from 'ngx-file-drop'
import { IpfsService, IPFSEnvironments } from 'app/services/ipfs.service'
import { StoredKeysService } from 'app/services/stored-keys.service'
import { Buffer as _Buffer } from 'buffer/'
import * as openpgp from 'openpgp'
import { CryptoService } from 'app/services/crypto.service'
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
          const tmp = fileData[0].content.toString('binary')
          const resultTest = _Buffer.from(tmp, 'binary')
          this.rawTextData.push({
            filename: filename,
            original: reader.result,
            buffer: fileData[0].content,
            binary: fileData[0].content.toString('binary'),
            utf8: fileData[0].content.toString('utf8'),
            tester: resultTest,
            teste2: _Buffer.from(tmp)
          })
          console.log('this.rawTextData: ', this.rawTextData)
          this.cryptoService.encrypt(fileData[0].content, this.selectedKey)
          // this.cryptoService.encrypt(fileData[0].content, this.keys)
          .then((encrypted) => {
            // console.log(encrypted)
            // const encryptedDataBuffer = _Buffer.from(encrypted.data)
            const encryptedDataBuffer = _Buffer.from(encrypted)
            // console.log('encryptedDataBuffer: ', encryptedDataBuffer)
            console.log('encryptedDataBuffer: ', { data: encryptedDataBuffer })
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

  public async testDecrypt() {
    const passphrase = 'theseam'
    const privKeyObj = openpgp.key.readArmored(this.selectedKey.keys.private).keys[0]
    privKeyObj.decrypt(passphrase)

    const pubKeyObj = openpgp.key.readArmored(this.selectedKey.keys.public).keys


    console.log('request')
    // const hash = 'QmaiAsH8ASTbwN5Mupn5Fez9KfS1rckS3vNqVTpGbNqrUB'

    const hash = 'QmV9tSDx9UiPeWExXEeH6aoDvmihvx6jD5eLb4jbTaKGps'
    // const hash = 'QmWW6SoKVCYovdBMSqrssgocyZnt3FEpu3FYVhvAsAciJg'

    const res = await this.ipfsService.ipfs.files.get(hash)
    const contentBuffer = res[0].content

    // const content = _Buffer.from(contentBuffer, 'binary')
    // console.log('content: ', content)

    console.log('contentBuffer: ', contentBuffer)



    // let options, encrypted
    let encrypted

    // const input = new Uint8Array([0x01, 0x01, 0x09])
    const input = contentBuffer
    console.log('input: ', input)
    // options = {
    //     data: input, // input as Uint8Array (or String)
    //     // passwords: ['secret stuff'],              // multiple passwords possible
    //     publicKeys: pubKeyObj,
    //     armor: false                              // don't ASCII armor (for Uint8Array output)
    // }

    // const ciphertext = await openpgp.encrypt(options)
    // // console.log('encrypt')
    // // console.log(ciphertext)
    // encrypted = ciphertext.message.packets.write() // get raw encrypted packets as Uint8Array

    encrypted = await this.cryptoService.encrypt(input, this.selectedKey)





    console.log('encrypted: ', encrypted)
    console.log('_Buffer.from(encrypted): ', _Buffer.from(encrypted))
    console.log('new Uint8Array(encrypted): ', new Uint8Array(encrypted))
    const addRes = await this.ipfsService.ipfs.files.add([{
      path: 'test_filename.pdf',
      // content: encrypted
      content: _Buffer.from(encrypted)
    }])
    const addFilesRes = addRes[0]
    console.log('addFilesRes: ', addFilesRes)



    const res2 = await this.ipfsService.ipfs.files.get(addFilesRes.hash)
    const contentBuffer2 = res2[0].content
    console.log('contentBuffer2: ', contentBuffer2)






    // options = {
    //     message: openpgp.message.read(encrypted), // parse encrypted bytes
    //     // password: 'secret stuff',                 // decrypt with password
    //     privateKey: privKeyObj,
    //     format: 'binary'                          // output as Uint8Array
    // }

    // const plaintext = await openpgp.decrypt(options)
    // const result = plaintext.data // Uint8Array([0x01, 0x01, 0x01])
    const result = await this.cryptoService.decrypt(encrypted, this.selectedKey)
    console.log('result: ', result)



    const missMatchData = await this.countBufferDifferences(input, result)
    console.log('missMatchData: ', missMatchData)
  }

  public async testDecrypt7() {
    const passphrase = 'theseam'
    const privKeyObj = openpgp.key.readArmored(this.selectedKey.keys.private).keys[0]
    privKeyObj.decrypt(passphrase)

    const pubKeyObj = openpgp.key.readArmored(this.selectedKey.keys.public).keys


    console.log('request')
    // const hash = 'QmaiAsH8ASTbwN5Mupn5Fez9KfS1rckS3vNqVTpGbNqrUB'

    const hash = 'QmV9tSDx9UiPeWExXEeH6aoDvmihvx6jD5eLb4jbTaKGps'
    // const hash = 'QmWW6SoKVCYovdBMSqrssgocyZnt3FEpu3FYVhvAsAciJg'

    const res = await this.ipfsService.ipfs.files.get(hash)
    const contentBuffer = res[0].content

    // const content = _Buffer.from(contentBuffer, 'binary')
    // console.log('content: ', content)

    console.log('contentBuffer: ', contentBuffer)



    let options, encrypted

    // const input = new Uint8Array([0x01, 0x01, 0x09])
    const input = contentBuffer
    console.log('input: ', input)
    options = {
        data: input, // input as Uint8Array (or String)
        // passwords: ['secret stuff'],              // multiple passwords possible
        publicKeys: pubKeyObj,
        armor: false                              // don't ASCII armor (for Uint8Array output)
    }

    const ciphertext = await openpgp.encrypt(options)
    // console.log('encrypt')
    // console.log(ciphertext)
    encrypted = ciphertext.message.packets.write() // get raw encrypted packets as Uint8Array






    console.log('encrypted: ', encrypted)
    console.log('_Buffer.from(encrypted): ', _Buffer.from(encrypted))
    console.log('new Uint8Array(encrypted): ', new Uint8Array(encrypted))
    const addRes = await this.ipfsService.ipfs.files.add([{
      path: 'test_filename.pdf',
      // content: encrypted
      content: _Buffer.from(encrypted)
    }])
    const addFilesRes = addRes[0]
    console.log('addFilesRes: ', addFilesRes)



    const res2 = await this.ipfsService.ipfs.files.get(addFilesRes.hash)
    const contentBuffer2 = res2[0].content
    console.log('contentBuffer2: ', contentBuffer2)






    options = {
        message: openpgp.message.read(encrypted), // parse encrypted bytes
        // password: 'secret stuff',                 // decrypt with password
        privateKey: privKeyObj,
        format: 'binary'                          // output as Uint8Array
    }

    const plaintext = await openpgp.decrypt(options)
    const result = plaintext.data // Uint8Array([0x01, 0x01, 0x01])
    console.log('result: ', result)



    const missMatchData = await this.countBufferDifferences(input, result)
    console.log('missMatchData: ', missMatchData)
  }

  public async testDecrypt6() {
    const passphrase = 'theseam'
    const privKeyObj = openpgp.key.readArmored(this.selectedKey.keys.private).keys[0]
    privKeyObj.decrypt(passphrase)

    const pubKeyObj = openpgp.key.readArmored(this.selectedKey.keys.public).keys


    console.log('request')
    // const hash = 'QmaiAsH8ASTbwN5Mupn5Fez9KfS1rckS3vNqVTpGbNqrUB'

    const hash = 'QmV9tSDx9UiPeWExXEeH6aoDvmihvx6jD5eLb4jbTaKGps'
    // const hash = 'QmWW6SoKVCYovdBMSqrssgocyZnt3FEpu3FYVhvAsAciJg'

    const res = await this.ipfsService.ipfs.files.get(hash)
    const contentBuffer = res[0].content

    // const content = _Buffer.from(contentBuffer, 'binary')
    // console.log('content: ', content)

    console.log('contentBuffer: ', contentBuffer)



    let options, encrypted

    // const input = new Uint8Array([0x01, 0x01, 0x09])
    const input = contentBuffer
    console.log('input: ', input)
    options = {
        data: input, // input as Uint8Array (or String)
        // passwords: ['secret stuff'],              // multiple passwords possible
        publicKeys: pubKeyObj,
        armor: false                              // don't ASCII armor (for Uint8Array output)
    }

    const ciphertext = await openpgp.encrypt(options)
    // console.log('encrypt')
    // console.log(ciphertext)
    encrypted = ciphertext.message.packets.write() // get raw encrypted packets as Uint8Array

    options = {
        message: openpgp.message.read(encrypted), // parse encrypted bytes
        // password: 'secret stuff',                 // decrypt with password
        privateKey: privKeyObj,
        format: 'binary'                          // output as Uint8Array
    }

    const plaintext = await openpgp.decrypt(options)
    const result = plaintext.data // Uint8Array([0x01, 0x01, 0x01])
    console.log('result: ', result)



    const missMatchData = await this.countBufferDifferences(input, result)
    console.log('missMatchData: ', missMatchData)
  }

  public async testDecrypt5() {
    console.log('request')
    // const hash = 'QmaiAsH8ASTbwN5Mupn5Fez9KfS1rckS3vNqVTpGbNqrUB'

    const hash = 'QmV9tSDx9UiPeWExXEeH6aoDvmihvx6jD5eLb4jbTaKGps'
    // const hash = 'QmWW6SoKVCYovdBMSqrssgocyZnt3FEpu3FYVhvAsAciJg'

    const res = await this.ipfsService.ipfs.files.get(hash)
    const contentBuffer = res[0].content

    // const content = _Buffer.from(contentBuffer, 'binary')
    // console.log('content: ', content)

    console.log('contentBuffer: ', contentBuffer)



    let options, encrypted

    // const input = new Uint8Array([0x01, 0x01, 0x09])
    const input = contentBuffer
    console.log('input: ', input)
    options = {
        data: input, // input as Uint8Array (or String)
        passwords: ['secret stuff'],              // multiple passwords possible
        armor: false                              // don't ASCII armor (for Uint8Array output)
    }

    const ciphertext = await openpgp.encrypt(options)
    // console.log('encrypt')
    // console.log(ciphertext)
    encrypted = ciphertext.message.packets.write() // get raw encrypted packets as Uint8Array

    options = {
        message: openpgp.message.read(encrypted), // parse encrypted bytes
        password: 'secret stuff',                 // decrypt with password
        format: 'binary'                          // output as Uint8Array
    }

    const plaintext = await openpgp.decrypt(options)
    const result = plaintext.data // Uint8Array([0x01, 0x01, 0x01])
    console.log('result: ', result)



    const missMatchData = await this.countBufferDifferences(input, result)
    console.log('missMatchData: ', missMatchData)
  }

  public async testDecrypt4() {
    let options, encrypted

    const input = new Uint8Array([0x01, 0x01, 0x09])
    console.log('input: ', input)
    options = {
        data: input, // input as Uint8Array (or String)
        passwords: ['secret stuff'],              // multiple passwords possible
        armor: false                              // don't ASCII armor (for Uint8Array output)
    }

    const ciphertext = await openpgp.encrypt(options)
    // console.log('encrypt')
    // console.log(ciphertext)
    encrypted = ciphertext.message.packets.write() // get raw encrypted packets as Uint8Array

    options = {
        message: openpgp.message.read(encrypted), // parse encrypted bytes
        password: 'secret stuff',                 // decrypt with password
        format: 'binary'                          // output as Uint8Array
    }

    const plaintext = await openpgp.decrypt(options)
    const result = plaintext.data // Uint8Array([0x01, 0x01, 0x01])
    console.log('result: ', result)
  }

  public async testDecrypt3() {
    let options, encrypted

    options = {
        data: new Uint8Array([0x01, 0x01, 0x09]), // input as Uint8Array (or String)
        passwords: ['secret stuff'],              // multiple passwords possible
        armor: false                              // don't ASCII armor (for Uint8Array output)
    }

    const ciphertext = await openpgp.encrypt(options)
    console.log('encrypt')
    console.log(ciphertext)
    encrypted = ciphertext.message.packets.write() // get raw encrypted packets as Uint8Array

    options = {
        message: openpgp.message.read(encrypted), // parse encrypted bytes
        password: 'secret stuff',                 // decrypt with password
        format: 'binary'                          // output as Uint8Array
    }

    const plaintext = await openpgp.decrypt(options)
    const result = plaintext.data // Uint8Array([0x01, 0x01, 0x01])
    console.log(result)
  }

  public async testDecrypt2() {
    // this.http
    //   // .post('https://www.webmerge.me/merge/152179/z4h8m7', data, { responseType: 'blob' })
    //   // .post('https://www.webmerge.me/merge/152179/z4h8m7', data, { responseType: 'text' })
    //   // .get('https://ipfs.io/ipfs/QmaiAsH8ASTbwN5Mupn5Fez9KfS1rckS3vNqVTpGbNqrUB', {})
    //   .post('https://ipfs.io/ipfs/QmaiAsH8ASTbwN5Mupn5Fez9KfS1rckS3vNqVTpGbNqrUB', {}, { responseType: 'blob' })
    //   .toPromise()
    //   .then((res: any) => {
    //     console.log('res: ', res)
    //     // const reader = new FileReader()
    //     // reader.onload = () => {
    //     //   console.log('reader.result', reader.result)
    //     //   const arrayBuffer = reader.result
    //     //   const array = new Uint8Array(arrayBuffer)
    //     //   const binaryString = String.fromCharCode.apply(null, array)

    //     //   // let fileData
    //     //   // let content
    //     //   // if (this.ipfsService.ipfsEnvironment === IPFSEnvironments.Local) {
    //     //   //   content = _Buffer.from(reader.result)
    //     //   //   fileData = [{
    //     //   //     path: 'TestDoc',
    //     //   //     content: content
    //     //   //   }]
    //     //   // } else {
    //     //   //   content = new this.ipfsService.ipfs.types.Buffer(reader.result)
    //     //   //   fileData = {
    //     //   //     path: 'TestDoc',
    //     //   //     content: content
    //     //   //   }
    //     //   // }

    //     //   // this.ipfsService.ipfs.files.add(fileData)
    //     //   // .then(addResult => {
    //     //   //   console.log(addResult)
    //     //   //   resolve(addResult)
    //     //   // })

    //     // }
    //     // reader.readAsArrayBuffer(res)
    //   })
    //   .catch(err => console.log(err))



    // const xhr = new XMLHttpRequest()

    // xhr.open('POST', 'https://ipfs.io/ipfs/QmaiAsH8ASTbwN5Mupn5Fez9KfS1rckS3vNqVTpGbNqrUB', true)
    // xhr.responseType = 'blob'
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    // xhr.onreadystatechange = function() {// Call a function when the state changes.
    //     if(xhr.readyState === 4 && xhr.status === 200) {
    //         const blob = new Blob([this.response], {type: 'application/pdf'})
    //         // saveAs(blob, 'Report.pdf')
    //         console.log('blob', blob)
    //     }
    // }

    // xhr.send()

    console.log('request')
    // const hash = 'QmaiAsH8ASTbwN5Mupn5Fez9KfS1rckS3vNqVTpGbNqrUB'

    const hash = 'QmV9tSDx9UiPeWExXEeH6aoDvmihvx6jD5eLb4jbTaKGps'
    // const hash = 'QmWW6SoKVCYovdBMSqrssgocyZnt3FEpu3FYVhvAsAciJg'

    // const requestUrl = `http://localhost:8080/ipfs/${hash}`
    // const xhr = new XMLHttpRequest()
    // xhr.open('GET', requestUrl)
    // // xhr.responseType = 'arraybuffer'
    // xhr.responseType = 'blob'

    // xhr.onload = () => {
    //   console.log(xhr.status)
    //   if (xhr.status === 200) {
    //     console.log('xhr.response: ', xhr.response)
    //     const blob = new Blob([xhr.response], {type: 'application/pdf'})
    //     const objectUrl = URL.createObjectURL(blob)
    //     console.log('blob: ', blob)
    //     console.log('objectUrl: ', objectUrl)
    //     // window.open(objectUrl)

    //     const reader = new FileReader()
    //     reader.onload = () => {
    //       console.log('reader.result', reader.result)
    //       const arrayBuffer = reader.result
    //       // const array = new Uint8Array(arrayBuffer)
    //       // const binaryString = String.fromCharCode.apply(null, array)
    //       // console.log('array: ', array)
    //       // console.log('binaryString: ', binaryString)

    //       const content = _Buffer.from(reader.result)
    //       console.log('content: ', content)

    //       this.testEncryptDecrypt(content)

    //       // const file1 = new Blob([content], { type: 'application/pdf' })
    //       // // const file1 = new Blob([content], { type: 'application/octet-stream' })
    //       // const fileURL = URL.createObjectURL(file1)
    //       // console.log('fileURL: ', fileURL)
    //       // window.open(fileURL)

    //       // this.cryptoService.decrypt(content, this.selectedKey).then((decryptResult) => {
    //       //   console.log('decryptResult: ', decryptResult)
    //       // })
    //     }
    //     reader.readAsArrayBuffer(xhr.response)
    //   }
    // }
    // xhr.send()



    const res = await this.ipfsService.ipfs.files.get(hash)
    const contentBuffer = res[0].content

    const content = _Buffer.from(contentBuffer, 'binary')
    console.log('content: ', content)

    this.testEncryptDecrypt(content)

  }

  public async testEncryptDecrypt(data: any) {
    console.log('testEncryptDecrypt data: ', data)

    const encryptResult = await this.cryptoService.encrypt(data, this.selectedKey)
    console.log('encryptResult: ', encryptResult)

    const decryptResult = await this.cryptoService.decrypt(encryptResult, this.selectedKey)
    console.log('decryptResult: ', decryptResult)

    const contentBuffer = _Buffer.from(decryptResult.data, 'binary')
    console.log('contentBuffer: ', contentBuffer)

    const missMatchData = await this.countBufferDifferences(data, contentBuffer)
    console.log('missMatchData: ', missMatchData)

    const missMatchOccurances = await this.countMissMatchOccurances(missMatchData.missMatchArr)
    // console.log('missMatchOccurances: ', missMatchOccurances)

    const missMatchOccurancesArr = this.missMatchOccurancesToArray(missMatchOccurances)
    console.log('missMatchOccurancesArr: ', missMatchOccurancesArr)

    const missMatchOccurancesArrSorted = missMatchOccurancesArr.sort((a, b) => {
      if (a.count === b.count) {
        return 0
      } else if (a.count > b.count) {
        return 1
      } else {
        return -1
      }
    })
    console.log('missMatchOccurancesArrSorted: ', missMatchOccurancesArrSorted)

    const missMatchOccurancesGrouped = this.missMatchedOccurancesGrouped(missMatchOccurances)
    console.log('missMatchOccurancesGrouped: ', missMatchOccurancesGrouped)



    // const fileContent = decryptResult.data
    const fileContent = contentBuffer

    // const file1 = new Blob([fileContent], { type: 'application/pdf' })
    // const file1 = new Blob([fileContent], { type: 'application/octet-stream' })
    // const fileURL = URL.createObjectURL(file1)
    // console.log('fileURL: ', fileURL)
    // window.open(fileURL)
  }

  public async countBufferDifferences(buff1, buff2) {
    const minLen = Math.min(buff1.length, buff2.length)

    const shiftTest1 = (bb1, bb2, ii) => {
      if (bb1[ii] === bb2[ii - 1] || bb1[ii] === bb2[ii + 1]) {
        return true
      } else {
        return false
      }
    }

    const shiftTest2 = (bb1, bb2, ii) => {
      if (bb1[ii] === bb2[ii - 1]) {
        return true
      } else {
        return false
      }
    }

    const shiftTest3 = (bb1, bb2, ii) => {
      if (bb1[ii] === bb2[ii + 1]) {
        return true
      } else {
        return false
      }
    }

    const missMatchArr = []
    let count = 0
    for (let i = 0; i < minLen; i++) {
      const b1 = buff1[i]
      const b2 = buff2[i]
      if (b1 !== b2) {
        count++
        missMatchArr.push({
          index: i,
          buffer1: b1,
          buffer2: b2,
          shiftTests: {
            test1: shiftTest1(buff1, buff2, i),
            test2: shiftTest2(buff1, buff2, i),
            test3: shiftTest3(buff1, buff2, i)
          },
          buffer1Surround: [ buff1[i - 1], buff1[i], buff1[i + 1] ],
          buffer2Surround: [ buff2[i - 1], buff2[i], buff2[i + 1] ]
        })
      }
    }

    return {
      count: count,
      missMatchArr: missMatchArr
    }
  }

  public async countMissMatchOccurances(missMatchArr: any[]) {
    const o: any = {}

    for (const missMatch of missMatchArr) {
      const key = `${missMatch.buffer1}:${missMatch.buffer2}`
      if (o.hasOwnProperty(key)) {
        o[key]++
      } else {
        o[key] = 1
      }
    }

    return o
  }

  public missMatchOccurancesToArray(missMatchOccurances: any) {
    const missMatchOccurancesArr = []

    for (const key in missMatchOccurances) {
      if (missMatchOccurances.hasOwnProperty(key)) {
        const val = missMatchOccurances[key]
        missMatchOccurancesArr.push({
          match: key,
          count: val
        })
      }
    }

    return missMatchOccurancesArr
  }

  public missMatchedOccurancesGrouped(missMatchOccurances: any) {
    const grps: any = {}

    for (const key in missMatchOccurances) {
      if (missMatchOccurances.hasOwnProperty(key)) {
        const val = missMatchOccurances[key]
        if (grps.hasOwnProperty(val)) {
          grps[val].push(key)
        } else {
          grps[val] = [ key ]
        }
      }
    }

    return grps
  }

}
