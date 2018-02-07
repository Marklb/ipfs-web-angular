import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class LayoutService {

  private _sideNavExpandedSubject = new BehaviorSubject<boolean>(true)
  public sideNavExpanded = this._sideNavExpandedSubject.asObservable()

  constructor() { }

  public setSideNavExpandedState(state: boolean): void {
    this._sideNavExpandedSubject.next(state)
  }

}
