import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import * as IPFS from 'ipfs'
import * as ipfsAPI from 'ipfs-api'
import { Buffer as _Buffer } from 'buffer/'
import 'rxjs/add/operator/toPromise'

export enum IpfsEnvironment {
  Browser = 'browser',
  Local = 'local'
}

export interface IpfsConnection {
  address: string,
  port: string,
  protocol: string,
  gatewayUrl: string,
  environment: IpfsEnvironment
}

@Injectable()
export class IpfsService {

  public ipfs: any

  public isReady: boolean = false

  public ipfsConnections = {
    browser: {
      gatewayUrl: 'https://ipfs.io/ipfs',
      environment: IpfsEnvironment.Browser
    },
    localhost: {
      address: 'localhost',
      port: '5001',
      protocol: 'http',
      gatewayUrl: 'http://localhost:8080/ipfs',
      environment: IpfsEnvironment.Local
    },
    // mberry2017: {
    //   address: 'mberry2017.theseam.com',
    //   port: '5001',
    //   protocol: 'https',
    //   gatewayUrl: 'https://mberry2017.theseam.com/ipfs',
    //   environment: IpfsEnvironment.Local
    // },
    jsuttontest1: {
      address: 'jsuttontest1.theseam.com',
      port: '443',
      protocol: 'https',
      gatewayUrl: 'https://jsuttontest1.theseam.com/ipfs',
      environment: IpfsEnvironment.Local
    },
    infura: {
      address: 'ipfs.infura.io',
      port: '5001',
      protocol: 'https',
      gatewayUrl: 'https://ipfs.infura.io/ipfs',
      environment: IpfsEnvironment.Local
    }
  }

  private _initialIpfsConnection: IpfsConnection = this.ipfsConnections.jsuttontest1

  private _ipfsConnectionSubject = new BehaviorSubject<IpfsConnection>(
    this._initialIpfsConnection)
  public ipfsConnectionChange = this._ipfsConnectionSubject.asObservable()

  private _ipfsConnection: IpfsConnection = this._initialIpfsConnection
  private get ipfsConnection(): IpfsConnection {
    return this._ipfsConnection
  }
  private set ipfsConnection(val: IpfsConnection) {
    this._ipfsConnection = val
    this._ipfsConnectionSubject.next(this._ipfsConnection)
  }

  constructor() {
    this._initIPFS().then(() => console.log('IPFS Initialized'))
  }

  private async _initIPFS (): Promise<any> {
    const ipfsConn: IpfsConnection = this.ipfsConnection
    const ipfsEnv: IpfsEnvironment = ipfsConn.environment

    if (ipfsEnv === IpfsEnvironment.Browser) {
      return this._initBrowserIPFS(ipfsConn)
    } else if (ipfsEnv === IpfsEnvironment.Local) {
      return this._initLocalIPFS(ipfsConn)
    } else {
      throw new Error('IPFS Environment not recognized')
    }
  }

  private async _initBrowserIPFS(ipfsConn: IpfsConnection): Promise<any> {
    // Create the IPFS node instance
    const repoPath = String(Math.random())

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
        this.isReady = true

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

        this._ipfsConnection = ipfsConn
        resolve()
      })
    })
  }

  private async _initLocalIPFS(ipfsConn: IpfsConnection): Promise<any> {
    this.ipfs = ipfsAPI(ipfsConn.address, ipfsConn.port,
      { protocol: ipfsConn.protocol })
    console.log('IPFS Local Ready')
    this.isReady = true

    this._ipfsConnection = ipfsConn
  }

  public getIpfsConnection(): IpfsConnection {
    return this.ipfsConnection
  }

  public async setIpfsConnection(connectionName: string): Promise<any> {
    if (!this.ipfsConnections[connectionName]) {
      throw new Error('IPFS Connection not known')
    }

    const ipfsConn = this.ipfsConnections[connectionName]
    if (ipfsConn.environment === IpfsEnvironment.Browser) {
      this.isReady = false
      this.ipfs.stop().then(this._initIPFS()).then(() => {
        console.log('Environment switched')
      })
    } else if (ipfsConn.environment === IpfsEnvironment.Local) {
      this.isReady = false
      this._initIPFS().then(() => {
        console.log('Environment switched')
      })
    } else {
      throw new Error('IPFS Connection environment not known')
    }
  }

  public getGatewayUrl(hash: string = null): string {
    const ipfsEnv = this.ipfsConnection.environment

    let url
    if (ipfsEnv === IpfsEnvironment.Browser) {
      url = `https://ipfs.io/ipfs`
    } else {
      url = this.ipfsConnection.gatewayUrl
    }

    if (hash !== null) {
      url = `${url}/${hash}`
    }

    return url
  }

}
