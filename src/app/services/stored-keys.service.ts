import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { environment } from '../../environments/environment'
import * as openpgp from 'openpgp'

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
    // const envKeys = environment.encryptionDemoKeys
    const localStorageKeys = this.getLocalStorageJson().keys

    const keys = [
      // ...envKeys,
      ...localStorageKeys
    ]

    const keys2 = []

    for (const k of keys) {
      console.log('k: ', k)
      const privateKey = openpgp.key.readArmored(k.keys.private)
      const publicKey = openpgp.key.readArmored(k.keys.public)
      keys2.push({
        userIds: [ { userId: publicKey.keys[0].users[0].userId.userid } ],
        keys: k.keys
      })
    }

    this._storedKeysSubject.next(keys2)
  }

  public getLocalStorageJson(): any {
    const item = localStorage.getItem(LOCAL_STORAGE_ITEM_KEY)
    let json: IStoredKeysLocalStorageJson
    if (item) {
      json = JSON.parse(item)
      // TODO: Ensure `json` has all required attributes
    } else {
      json = this.resetLocalStorageToDefault(false)
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

  public removeKeyFromLocalStorage(key: any): void {
    const tmp = this.getLocalStorageJson()
    const tmp2 = tmp.keys.filter(x =>
      x.keys.private !== key.keys.private && x.keys.public !== key.keys.public)
    tmp.keys = tmp2
    localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, JSON.stringify(tmp))
    this.loadStoredKeys()
  }

  public resetLocalStorageToDefault(reload: boolean = true): any {
    const envKeys = environment.encryptionDemoKeys
    const json = {
      keys: [...envKeys]
    }
    localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, JSON.stringify(json))
    this.loadStoredKeys()
    return json
  }

}
