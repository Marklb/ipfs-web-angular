import { Injectable } from '@angular/core'
import * as ipfsAPI from 'ipfs-api'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class IpfsService {
  public ipfs: any

  private _knownPeersSubject = new BehaviorSubject<any>({
    'QmRymhAzvKAsL5B1MegZUhTeC9ZL37XxCct3VtnZUZakb5': { name: 'ipfs_host_01' },
    'QmfNCXBCj6CMrRnbdTcoWHBG2Gck68Cg1FrfpKunW73bsL': { name: 'ipfs_host_02' },
    'QmX7whGzuhmzZKNQB4y4XtjKBCRXFgLTH6rL7SbFtR195u': { name: 'ipfs_host_03' },
    'QmXZ5KYKmiWwU3W9pdvxyB5fdYfA818WABdg9KFHHy8PRH': { name: 'ipfs_host_04' }
  })
  public knownPeers = this._knownPeersSubject.asObservable()

  constructor() {
    this.ipfs = ipfsAPI('localhost', '5002', {protocol: 'http'})
  }

}
