import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { environment } from '../../environments/environment'

const LOCAL_STORAGE_ITEM_KEY = 'stored-keys-service'

export interface IStoredKeysLocalStorageJson {
  keys: any[]
}

@Injectable()
export class StoredKeysService {

  private _storedKeysSubject = new BehaviorSubject<any[]>([])
  public storedKeys = this._storedKeysSubject.asObservable()

  constructor() {
    this.loadStoredKeys()
  }

  public loadStoredKeys(): void {
    // const tmp = this.getLocalStorageJson()
    // console.log('tmp: ', tmp)
    // const tmp2 = tmp.keys.filter(x => x.userIds[0].name !== 'Mark3')
    // console.log('tmp2: ', tmp2)
    // tmp.keys = tmp2
    // localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, JSON.stringify(tmp))


    const envKeys = environment.encryptionDemoKeys
    const localStorageKeys = this.getLocalStorageJson().keys

    const keys = [
      ...envKeys,
      ...localStorageKeys
    ]

    this._storedKeysSubject.next(keys)
  }

  public getLocalStorageJson(): any {
    const item = localStorage.getItem(LOCAL_STORAGE_ITEM_KEY)
    let json: IStoredKeysLocalStorageJson
    if (item) {
      json = JSON.parse(item)
      // TODO: Ensure `json` has all required attributes
    } else {
      json = {
        keys: []
      }
      localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, JSON.stringify(json))
    }
    return json
  }

  public addKeyToLocalStorage(key: any): any {
    const json = this.getLocalStorageJson()
    json.keys.push(key)
    localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, JSON.stringify(json))
  }

  public storeNewKey(key: any, saveToLocalStorage: boolean = false) {
    if (saveToLocalStorage) {
      this.addKeyToLocalStorage(key)
    }
    const keys = this._storedKeysSubject.getValue()
    keys.push(key)
    this._storedKeysSubject.next(keys)
  }

}
