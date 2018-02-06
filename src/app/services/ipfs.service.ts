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
    'Qma3QYuNc2KVMNtnmT92Z4Pn5dzZ8SHU6R7SjDc1pCzppb': { name: 'office_desktop' },
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
    // const repoPath = 'TestBrowserNode'
    console.log(`repoPath: ${repoPath}`)

    this.ipfs = new IPFS({
      init: true,
      start: true,
      repo: repoPath,
      config: {
        Addresses: {
          Swarm: [
            '/ip4/127.0.0.1/tcp/9999/ws/ipfs/Qma3QYuNc2KVMNtnmT92Z4Pn5dzZ8SHU6R7SjDc1pCzppb',
            // '/ip4/127.0.0.1/tcp/9999/ws/ipfs/Qma3QYuNc2KVMNtnmT92Z4Pn5dzZ8SHU6R7SjDc1pCzppb',
            '/ip4/127.0.0.1/tcp/9999/ws',
            '/ip4/127.0.0.1/tcp/4001',
            // '/p2p-circuit/ipfs/Qma3QYuNc2KVMNtnmT92Z4Pn5dzZ8SHU6R7SjDc1pCzppb'
          ]
        },
        Bootstrap: [
          // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star/ipfs/<your-peer-id>',
          // '/ip4/127.0.0.1/tcp/9999/ws',

          '/ip4/127.0.0.1/tcp/9999/ws/ipfs/Qma3QYuNc2KVMNtnmT92Z4Pn5dzZ8SHU6R7SjDc1pCzppb',
          '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
          '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
          '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
          '/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
          '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
          '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
          '/dns4/wss0.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
          '/dns4/wss1.bootstrap.libp2p.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6'
        ]
      }
    })

    return new Promise<any>((resolve, reject) => {
      this.ipfs.on('ready', () => {
        console.log('IPFS Browser Ready')
        window.g_ipfs = this.ipfs
        this.ipfs.id().then(id => { console.log(id) })
        this.ipfs.config.get().then((res) => { console.log(res) })
        // this.ipfs.config.get().then((res) => {
        //   console.log(res)
        //   const signalServer = ('/dns4/libp2p-webrtc-star/ip4/127.0.0.1/tcp/9090/ws/ipfs/' + res.Identity.PeerID)
        //   // const signalServer = ('/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star/ipfs/' + res.Identity.PeerID)
        //   // this.ipfs.config.set('Adresses.Swarm')
        //   this.ipfs.swarm.connect(signalServer).then(swarmConnectRes => {
        //     console.log('swarmConnectRes: ', swarmConnectRes)
        //   })
        // })
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
