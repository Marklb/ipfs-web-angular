import { Component, OnInit } from '@angular/core'
import { IpfsService } from 'app/services/ipfs.service'
import { LayoutService } from 'app/services/layout.service'

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  public sideNavExpanded: boolean = true

  constructor(private ipfsService: IpfsService,
              private layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.sideNavExpanded.subscribe(res => {
      this.sideNavExpanded = res
    })
  }

}
