import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import * as IPFS from 'ipfs'
import * as ipfsAPI from 'ipfs-api'

declare var window: any

export enum IPFSEnvironments {
  Browser = 'browser',
  Local = 'local'
}

@Injectable()
export class IpfsService {

  public ipfs: any
  private _ipfsEnvironment: IPFSEnvironments = IPFSEnvironments.Browser

  private _knownPeersSubject = new BehaviorSubject<any>({
    'QmRymhAzvKAsL5B1MegZUhTeC9ZL37XxCct3VtnZUZakb5': { name: 'ipfs_host_01' },
    'QmfNCXBCj6CMrRnbdTcoWHBG2Gck68Cg1FrfpKunW73bsL': { name: 'ipfs_host_02' },
    'QmX7whGzuhmzZKNQB4y4XtjKBCRXFgLTH6rL7SbFtR195u': { name: 'ipfs_host_03' },
    'QmXZ5KYKmiWwU3W9pdvxyB5fdYfA818WABdg9KFHHy8PRH': { name: 'ipfs_host_04' }
  })
  public knownPeers = this._knownPeersSubject.asObservable()

  constructor() {
    this._initIPFS().then(() => console.log('IPFS Initialized'))
  }

  private async _initIPFS (): Promise<any> {
    if (this._ipfsEnvironment === IPFSEnvironments.Browser) {
      return this._initBrowserIPFS()
    } else if (this._ipfsEnvironment === IPFSEnvironments.Local) {
      return this._initLocalIPFS()
    } else {
      throw new Error('IPFS Environment not recognized')
    }
  }

  private async _initBrowserIPFS(): Promise<any> {
    // Create the IPFS node instance
    const repoPath = String(Math.random())

    this.ipfs = new IPFS({
      init: true,
      start: true,
      repo: repoPath
    })

    return new Promise<any>((resolve, reject) => {
      this.ipfs.on('ready', () => {
        console.log('IPFS Browser Ready')
        window.g_ipfs = this.ipfs
        resolve()
      })
    })
  }

  private async _initLocalIPFS(): Promise<any> {
    this.ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})
    console.log('IPFS Local Ready')
  }

  public useIPFSEnvironment(env: IPFSEnvironments) {
    if (this._ipfsEnvironment === env) { return }

    this._ipfsEnvironment = env

    if (this._ipfsEnvironment === IPFSEnvironments.Local) {
      this.ipfs.stop().then(this._initIPFS()).then(() => {
        console.log('Environment switched')
      })
    } else {
      this._initIPFS().then(() => {
        console.log('Environment switched')
      })
    }
  }

  public get ipfsEnvironment() {
    return this._ipfsEnvironment
  }

}
