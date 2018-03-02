import { Injectable } from '@angular/core'
// import * as localForage from 'localforage'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

// @Injectable()
// export class LocalStorageService {

//   /**
//    *
//    * @param key
//    * @param value
//    * @returns {any}
//    */
//   public setItem<T>(key: string, value: T): Observable<T> {
//     return Observable.fromPromise(localForage.setItem(key, value))
//   }

//   /**
//    *
//    * @param key
//    * @returns {any}
//    */
//   public getItem<T>(key: string): Observable<T> {
//     return Observable.fromPromise(localForage.getItem(key))
//   }

//   /**
//    *
//    * @param key
//    * @returns {any}
//    */
//   public removeItem(key: string): Observable<void> {
//     return Observable.fromPromise(localForage.removeItem(key))
//   }
// }


export interface ILocalStorageService {
  select(key: string, defaultValue: any): Observable<any>
  set(key: string, value: any): void
  remove(key: string): void
}

@Injectable()
export class LocalStorageService implements ILocalStorageService {

  protected subjects: {[key: string]: BehaviorSubject<any>} = {}

  /**
   *
   * @param key
   * @param defaultValue
   */
  select(key: string, defaultValue: any = null): Observable<any> {

    if (this.subjects.hasOwnProperty(key)) {
      return this.subjects[key]
    }

    if (!window.localStorage.getItem(key) && defaultValue) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue))
    }

    const value = window.localStorage.getItem(key)
      ? JSON.parse(window.localStorage.getItem(key))
      : defaultValue

    return this.subjects[key] = new BehaviorSubject(value)
  }

  /**
   *
   * @param key
   * @param value
   */
  set(key: string, value: any): void {

    window.localStorage.setItem(key, JSON.stringify(value))

    if (this.subjects.hasOwnProperty(key)) {
      this.subjects[key].next(value)
    }
  }

  /**
   *
   * @param key
   */
  remove(key: string): void {

    window.localStorage.removeItem(key)

    if (this.subjects.hasOwnProperty(key)) {
      this.subjects[key].next(null)
    }
  }
}
