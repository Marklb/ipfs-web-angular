import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/debounceTime'


@Injectable()
export class LayoutService {

  public isMobile: boolean = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()))

  private _sideNavExpandedSubject = new BehaviorSubject<boolean>(true)
  public sideNavExpanded = this._sideNavExpandedSubject.asObservable()

  private _pageTitleSubject = new BehaviorSubject<string>('Page Title')
  public pageTitle = this._pageTitleSubject.asObservable()

  private _isBootstrapSubject = new BehaviorSubject<boolean>(true)
  public isBootstrap = this._isBootstrapSubject.asObservable()

  constructor() {
    Observable.fromEvent(window, 'resize').debounceTime(100).subscribe(() => {
      this.trigger()
    })
    this.trigger()
  }

  public trigger() {
    // Check if side window should be collapsed
    // TODO: Make this smarter
    if (window.innerWidth < 979) {
      this.setSideNavExpandedState(false)
    }
  }

  public setSideNavExpandedState(state: boolean): void {
    this._sideNavExpandedSubject.next(state)
  }

  public setPageTitle(title: string) {
    this._pageTitleSubject.next(title)
  }

  public setIsBootstrap(b: boolean) {
    this._isBootstrapSubject.next(b)
  }

}
