import { Component, OnInit, Input } from '@angular/core'
import { IpfsService } from 'app/services/ipfs.service'
import { LayoutService } from 'app/services/layout.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  get flexSide() {
    let s = '200px'
    if (!this.sidebarVisible) {
      s = '0px'
    }
    return s
  }

  get flexContent() {
    let s = '1 1 calc(100% - 200px)'
    if (!this.sidebarVisible) {
      s = 'grow'
    }
    return s
  }

  @Input('sidebarVisible')
  private sidebarVisible: boolean = true

  constructor(private ipfsService: IpfsService,
              private layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.sideNavExpanded.subscribe(res => {
      this.sidebarVisible = res
    })
  }

}
