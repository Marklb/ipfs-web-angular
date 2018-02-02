import { Component, OnInit, ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { IJspdfTplExample1Model } from 'app/shared/jspdf-templates/jspdf-tpl-example-1/jspdf-tpl-example-1.component'
import { IpfsService, IPFSEnvironments } from 'app/services/ipfs.service'
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
    if (this.ipfsService.ipfsEnvironment === IPFSEnvironments.Local) {
      return 'http://localhost:8080/ipfs/'
    }
    return 'https://ipfs.io/ipfs/'
  }

  get hostLocation(): string {
    return location.origin
  }

  @ViewChild('docForm') form

  pdfData: IJspdfTplExample1Model = {
    name: 'Mark',
    address: '123 Some Place',
    city: 'Arlington',
    state: 'TN',
    zip: '38002'
  }

  constructor(private http: HttpClient,
              private ipfsService: IpfsService) { }

  ngOnInit() {
  }
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
    this.postToIpfs(data).then(res => {
      console.log('Done')
    })

  }

  private async postToIpfs(data: any): Promise<any> {
    const docResult = await this.postDocToIpfs(data)
    // const docResult = await this.postDocToIpfs2(data)
    console.log('docResult: ', docResult)
    const docDataResult = await this.postDocDataToIpfs(data, docResult[0])
    console.log('docDataResult: ', docDataResult)

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
      .toPromise()
      .then(res => {
        console.log(res)
        const reader = new FileReader()
        reader.onload = () => {
          console.log('reader.result', reader.result)
          const arrayBuffer = reader.result
          const array = new Uint8Array(arrayBuffer)
          const binaryString = String.fromCharCode.apply(null, array)

          let fileData
          let content
          if (this.ipfsService.ipfsEnvironment === IPFSEnvironments.Local) {
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
      if (this.ipfsService.ipfsEnvironment === IPFSEnvironments.Local) {
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
    if (this.ipfsService.ipfsEnvironment === IPFSEnvironments.Local) {
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

}