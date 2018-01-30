import { Component, OnInit, OnDestroy } from '@angular/core'
import { IpfsService } from '../../services/ipfs.service'

interface IPeer {
  id: string
}

@Component({
  selector: 'app-peers-list',
  templateUrl: './peers-list.component.html',
  styleUrls: ['./peers-list.component.scss']
})
export class PeersListComponent implements OnInit, OnDestroy {

  private peersList: IPeer[] = []
  private knownPeers: any
  private peersInterval: any

  constructor(private ipfsService: IpfsService) { }

  ngOnInit() {
    this.ipfsService.knownPeers.subscribe(known => this.knownPeers = known)

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
      // console.log(peers)
      peers = peers.sort((a, b) => {
        return a.peer.toB58String() > b.peer.toB58String() ? 1 : -1
      })

      const peersListTmp: IPeer[] = []
      peers.forEach((peer, i) => {
        peer.ipfs = this.ipfsService.ipfs
        peer.location = {
          formatted: ''
        }

        const id = peer.peer.toB58String()
        // console.log(id)
        peersListTmp.push({
          id: id
        })
        this.peersList = peersListTmp
      })
    })
    .catch((err) => { console.log(err) })
  }

}
