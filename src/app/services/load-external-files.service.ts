import { Injectable } from '@angular/core'
declare let document: any

@Injectable()
export class LoadExternalFilesService {

  constructor() {}

  public loadFiles(...paths: string[]) {
    const promises = paths
    .reduce((promiseArr: Array<Promise<any>>, path: string) =>
      [...promiseArr, this.loadFile(path)], [])
    return Promise.all(promises)
  }

  public loadFile(path: string) {

    return new Promise((resolve, reject) => {
      let e: any
      if (/(^css!|\.css$)/.test(path)) {
        console.log('loadCss: ', path)
        // css
        e = document.createElement('link')
        e.rel = 'stylesheet'
        e.href = path.replace(/^css!/, '')  // remove "css!" prefix
        console.log(e.href)
      } else {
        // javascript
        e = document.createElement('script')
        e.src = path
        e.async = true
      }
      document.getElementsByTagName('head')[0].appendChild(e)

      e.onload = () => {
        resolve()
      }
      e.onerror = (err: any) => reject(new Error(`Files not found. ${path}`))
    })
  }
}
