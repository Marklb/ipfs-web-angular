import { Component, OnInit, ViewChild } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IJspdfTplExample1Model } from 'app/shared/jspdf-templates/jspdf-tpl-example-1/jspdf-tpl-example-1.component'
import { IpfsService, IpfsEnvironment, IpfsConnection } from 'app/services/ipfs.service'
import * as jsPDF from 'jspdf'
import * as _buffer from 'buffer/'
const _Buffer = _buffer.Buffer

interface ITestFormModel {
  name: string
  address: string
  city: string
  state: string
  zip: string
}

@Component({
  selector: 'app-webmerge-demo',
  templateUrl: './webmerge-demo.component.html',
  styleUrls: ['./webmerge-demo.component.scss']
})
export class WebmergeDemoComponent implements OnInit {

  private _defaultFormData: ITestFormModel = {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  }

  public formData: ITestFormModel = Object.assign({}, this._defaultFormData)

  public postedDocInfo: any

  get gatewayUrl(): string {
    return this.ipfsService.getGatewayUrl()
  }

  get hostLocation(): string {
    return location.origin
  }

  public uploading: boolean = false

  @ViewChild('docForm') form

  pdfData: IJspdfTplExample1Model = {
    name: 'Mark',
    address: '123 Some Place',
    city: 'Arlington',
    state: 'TN',
    zip: '38002'
  }

  public pdfCreationService: string = 'Webmerge'

  constructor(public http: HttpClient,
              public ipfsService: IpfsService) { }

  ngOnInit() { }

  resetComponent() {
    this.formData = Object.assign({}, this._defaultFormData)
    this.postedDocInfo = undefined
  }

  onSubmit() {
    console.log('onSubmit: ', this.formData)
    const data = {
      test: 1,
      download: 1,
      Name: this.formData.name,
      Address: this.formData.address,
      City: this.formData.city,
      State: this.formData.state,
      Zip: this.formData.zip,
      // SigImg: 'https://www.theseam.com/resources/images/logo_black.png'
      // SigImg: 'data:image/png;base64,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'
    }
    // const data = {
    //   test: 1,
    //   download: 1,
    //   Name: 'Mark2',
    //   Address: '123SomeWhere',
    //   City: 'Arlington',
    //   State: 'TN',
    //   Zip: '38002',
    // }

    this.uploading = true
    this.postToIpfs(data).then(res => {
      console.log('Done')
      this.uploading = false
      this.pdfData = Object.assign({}, {
        name: data.Name,
        address: data.Address,
        city: data.City,
        state: data.State,
        zip: data.Zip
      })
    })

  }

  private async postToIpfs(data: any): Promise<any> {
    let docResult
    if (this.pdfCreationService === 'Webmerge') {
      docResult = await this.postDocToIpfs(data)
    } else if (this.pdfCreationService === 'jsPDF') {
      docResult = await this.postDocToIpfs2(data)
    }
    console.log('docResult: ', docResult)

    // await this.isAvailable(`https://ipfs.io/ipfs/${docResult[0].hash}`)
    await this.isAvailable(`${this.gatewayUrl}${docResult[0].hash}`)

    const docDataResult = await this.postDocDataToIpfs(data, docResult[0])
    console.log('docDataResult: ', docDataResult)

    // await this.isAvailable(`https://ipfs.io/ipfs/${docDataResult[0].hash}`)
    await this.isAvailable(`${this.gatewayUrl}${docDataResult[0].hash}`)

    this.postedDocInfo = {
      doc: docResult[0],
      data: docDataResult[0]
    }
    console.log('this.postedDocInfo: ', this.postedDocInfo)

    this.formData = undefined
  }

  private async postDocToIpfs(data: any): Promise<any> {
    console.log('data: ', data)
    return new Promise((resolve, reject) => {
      this.http
      .post('https://www.webmerge.me/merge/152179/z4h8m7', data, { responseType: 'blob' })
      // .post('https://www.webmerge.me/merge/152179/z4h8m7', data, { responseType: 'text' })
      .toPromise()
      .then(res => {
        // console.log('res: ', res)
        const reader = new FileReader()
        reader.onload = () => {
          // console.log('reader.result', reader.result)
          const arrayBuffer = reader.result
          const array = new Uint8Array(arrayBuffer)
          const binaryString = String.fromCharCode.apply(null, array)

          let fileData
          let content
          const ipfsConn: IpfsConnection = this.ipfsService.getIpfsConnection()
          const ipfsEnv: IpfsEnvironment = ipfsConn.environment
          if (ipfsEnv === IpfsEnvironment.Local) {
            content = _Buffer.from(reader.result)
            fileData = [{
              path: 'TestDoc',
              content: content
            }]
          } else {
            content = new this.ipfsService.ipfs.types.Buffer(reader.result)
            fileData = {
              path: 'TestDoc',
              content: content
            }
          }

          this.ipfsService.ipfs.files.add(fileData)
          .then(addResult => {
            console.log(addResult)
            resolve(addResult)
          })

        }
        reader.readAsArrayBuffer(res)
      })
      .catch(err => reject(err))
    })
  }

  private async postDocToIpfs2(data: any): Promise<any> {
    console.log('data: ', data)
    return new Promise((resolve, reject) => {
      const doc = new jsPDF()

      doc.setFontSize(20)
      doc.text(15, 25, 'Name: ' + data.Name)
      doc.text(15, 35, 'Address: ' + data.Address)
      doc.text(15, 45, 'City: ' + data.City)
      doc.text(15, 55, 'State: ' + data.State)
      doc.text(15, 65, 'Zip: ' + data.Zip)

      // doc.output('datauristring') // arraybuffer, blob, dataurlnewwindow
      const pdfArrayBuffer = doc.output('arraybuffer')

      let fileData
      let content
      const ipfsConn: IpfsConnection = this.ipfsService.getIpfsConnection()
      const ipfsEnv: IpfsEnvironment = ipfsConn.environment
      if (ipfsEnv === IpfsEnvironment.Local) {
        content = _Buffer.from(pdfArrayBuffer)
        fileData = [{
          path: 'TestDoc',
          content: content
        }]
      } else {
        content = new this.ipfsService.ipfs.types.Buffer(pdfArrayBuffer)
        fileData = {
          path: 'TestDoc',
          content: content
        }
      }

      // this.sendToWebApi(fileData)

      this.ipfsService.ipfs.files.add(fileData)
      .then(addResult => {
        console.log(addResult)
        resolve(addResult)
      })
    })
  }

  private async postDocDataToIpfs(data: any, docIpfsData: any): Promise<any> {
    const contentJson = {
      hash: docIpfsData.hash,
      data: data
    }

    let fileData
    let content
    const ipfsConn: IpfsConnection = this.ipfsService.getIpfsConnection()
    const ipfsEnv: IpfsEnvironment = ipfsConn.environment
    if (ipfsEnv === IpfsEnvironment.Local) {
      content = _Buffer.from(JSON.stringify(contentJson))
      fileData = [{
        path: 'TestDocData',
        content: content
      }]
    } else {
      content = new this.ipfsService.ipfs.types.Buffer(JSON.stringify(contentJson))
      fileData = {
        path: 'TestDocData',
        content: content
      }
    }

    return this.ipfsService.ipfs.files.add(fileData)
  }

  // private async sendToWebApi(fileData: any): Promise<any> {
  //   // NOTE: Not working yet
  //   const formData: FormData = new FormData()
  //   // formData.append('uploadFile', file, file.name)
  //   formData.append('uploadFile', fileData.content, fileData.path)
  //   const headers = new HttpHeaders()
  //   headers.append('Content-Type', 'json')
  //   headers.append('Accept', 'application/json')
  //   // const options = new Request({ headers: headers })
  //   // let apiUrl1 = "/api/UploadFileApi"
  //   // this.http.post(apiUrl1, formData, options)

  //   this.http
  //     .post('http://localhost:42252/api/upload', formData, {
  //       headers: headers
  //     })
  //     .toPromise()
  //     .then(res => {
  //       console.log('sendToWebApi: ', res)
  //     })


  //   // const data = new FormData()
  //   // const fileData = document.querySelector('input[type="file"]').files[0]
  //   // data.append('data', fileData)
  //   // const that = this
  //   // fetch('api/upload', {
  //   //     method: 'POST',
  //   //     'Content-Type': 'multipart/form-data',
  //   //     'Accept': 'application/json',
  //   //     body: data
  //   // }).then(function (res) {
  //   //   console.log('res: ', res)
  //   // })
  // }

  public async isAvailable(url: string): Promise<any> {
    console.log('isAvailable: ', url)
    return this.http.get(url, { responseType: 'blob' })
      .toPromise().then((res) => {
        console.log('isAvailable res: ', res)
      })
  }

}
