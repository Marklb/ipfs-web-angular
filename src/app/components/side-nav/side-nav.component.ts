import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @ViewChild('#demo1LinkActive') _demo1LinkActive
  @ViewChild('#demo2LinkActive') _demo2LinkActive
  @ViewChild('#demo3LinkActive') _demo3LinkActive

  get demoLinksActive() {
    console.log('this._demo1LinkActive: ', this._demo1LinkActive)
    console.log('this._demo2LinkActive: ', this._demo2LinkActive)
    console.log('this._demo3LinkActive: ', this._demo3LinkActive)
    console.log('router.url: ', this.router.url)
    let b = false
    if (this._demo1LinkActive) {
      b = true
    }
    if (this._demo2LinkActive) {
      b = true
    }
    if (this._demo3LinkActive) {
      b = true
    }
    console.log('b: ', b)
    return b
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
