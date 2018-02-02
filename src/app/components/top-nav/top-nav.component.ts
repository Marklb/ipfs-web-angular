import { Component, OnInit } from '@angular/core'
import { IpfsService } from 'app/services/ipfs.service'

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(private ipfsService: IpfsService) { }

  ngOnInit() {
  }

}
