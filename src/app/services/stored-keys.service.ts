import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { environment } from '../../environments/environment'

@Injectable()
export class StoredKeysService {

  private _storedKeysSubject = new BehaviorSubject<any[]>([])
  public storedKeys = this._storedKeysSubject.asObservable()

  constructor() {
    this.loadStoredKeys()
  }

  public loadStoredKeys(): void {
    // console.log('keys from environment: ', environment.encryptionDemoKeys)
    // TODO: Allow keys to be loaded from multiple storages (ex. localstorage)
    this._storedKeysSubject.next(environment.encryptionDemoKeys)
  }

}
