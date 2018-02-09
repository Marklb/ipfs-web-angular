import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'


@Injectable()
export class LayoutService {

  public isMobile: boolean = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()))

  private _sideNavExpandedSubject = new BehaviorSubject<boolean>(true)
  public sideNavExpanded = this._sideNavExpandedSubject.asObservable()

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

}
