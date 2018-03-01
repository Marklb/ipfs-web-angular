import { Component, OnInit, OnDestroy } from '@angular/core'
import { IpfsService, IpfsEnvironment, IpfsConnection } from '../../services/ipfs.service'

interface IPeer {
  id: string
}

@Component({
  selector: 'app-peers-list',
  templateUrl: './peers-list.component.html',
  styleUrls: ['./peers-list.component.scss']
})
export class PeersListComponent implements OnInit, OnDestroy {

  public peersList: IPeer[] = []
  public peersInterval: any

  constructor(public ipfsService: IpfsService) { }

  ngOnInit() {
    this.peersInterval = setInterval(() => {
      this.refreshPeers()
    }, 1000)

  }

  ngOnDestroy() {
    clearInterval(this.peersInterval)
  }

  public refreshPeers(): void {
    this.ipfsService.ipfs.swarm.peers()
    .then((peers) => {
      const ipfsConn: IpfsConnection = this.ipfsService.getIpfsConnection()
      const ipfsEnv: IpfsEnvironment = ipfsConn.environment
      // console.log('peers: ', peers)
      peers = peers.sort((a, b) => {
        if (ipfsEnv === IpfsEnvironment.Local) {
          return a.peer.toB58String() > b.peer.toB58String() ? 1 : -1
        } else {
          return a.peer.id.toB58String() > b.peer.id.toB58String() ? 1 : -1
        }
      })

      const peersListTmp: IPeer[] = []
      peers.forEach((peer, i) => {
        let id
        if (ipfsEnv === IpfsEnvironment.Local) {
          id = peer.peer.toB58String()
        } else {
          id = peer.peer.id.toB58String()
        }
        peersListTmp.push({
          id: id
        })
        this.peersList = peersListTmp
      })
    })
    .catch((err) => { console.log(err) })
  }

}
