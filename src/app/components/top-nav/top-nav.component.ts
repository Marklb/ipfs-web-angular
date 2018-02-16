import { Component, OnInit, ViewChild } from '@angular/core'
import { IpfsService, IPFSEnvironments } from 'app/services/ipfs.service'
import { LayoutService } from 'app/services/layout.service'

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  public sideNavExpanded: boolean = true

  public buttonStates = {
      browser: false,
      localhost: false,
      jsuttontest1: false
  }

  constructor(public ipfsService: IpfsService,
              public layoutService: LayoutService) {
    this.ipfsService.ipfsEnvironmentExtended.subscribe((env) => {
      if (env.environment === IPFSEnvironments.Browser) {
        this.buttonStates.browser = true
        this.buttonStates.localhost = false
        this.buttonStates.jsuttontest1 = false
      } else if (env.environment === IPFSEnvironments.Local) {
        if (env.connection.address === 'localhost' || env.connection.address === '127.0.0.1') {
          this.buttonStates.browser = false
          this.buttonStates.localhost = true
          this.buttonStates.jsuttontest1 = false
        } else if (env.connection.address === 'jsuttontest1.theseam.com') {
          this.buttonStates.browser = false
          this.buttonStates.localhost = false
          this.buttonStates.jsuttontest1 = true
        }
      }
    })
  }

  ngOnInit() {
    this.layoutService.sideNavExpanded.subscribe(res => {
      this.sideNavExpanded = res
    })
  }

  onClickBrowser() {
    this.ipfsService.useIPFSEnvironment(IPFSEnvironments.Browser)
  }

  onClickLocal() {
    this.ipfsService.setIpfsConnection('localhost')
    this.ipfsService.useIPFSEnvironment(IPFSEnvironments.Local)
  }

  onClickJSuttonTest1() {
    this.ipfsService.setIpfsConnection('jsuttontest1')
    this.ipfsService.useIPFSEnvironment(IPFSEnvironments.Local)
  }

}
