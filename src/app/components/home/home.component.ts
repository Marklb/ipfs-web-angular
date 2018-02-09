import { Component, OnInit } from '@angular/core'
import { IpfsService } from '../../services/ipfs.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public idData: any

  constructor(public ipfsService: IpfsService) {
    this.ipfsService.ipfsEnvironmentExtended.subscribe((env) => {
      this.ipfsService.ipfs.id()
      .then((id) => {
        // console.log(id)
        this.idData = id
      })
      .catch((err) => { console.log(err) })
    })
  }

  ngOnInit() {
    this.ipfsService.ipfs.id()
    .then((id) => {
      // console.log(id)
      this.idData = id
    })
    .catch((err) => { console.log(err) })
  }

}
