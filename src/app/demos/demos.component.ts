import { Component, OnInit } from '@angular/core'
import { LayoutService } from 'app/services/layout.service'

@Component({
  selector: 'app-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.scss']
})
export class DemosComponent implements OnInit {

  public pageTitle: string = 'Demos'

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.setPageTitle('Demos')
  }

  onActivate(event: any) {
    console.log('onActivate: ', event)
    if (event.pageTitle) {
      this.pageTitle = event.pageTitle
    }
  }

  onDeactivate(event: any) {
    console.log('onDeactivate: ', event)
    if (event.pageTitle) {
      this.pageTitle = 'Demos'
    }
  }

}
