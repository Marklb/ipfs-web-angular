import { Injectable } from '@angular/core'
import * as localForage from 'localforage'
import { IpfsConnection } from './ipfs.service'
import { Observable } from 'rxjs/Observable'
import { LocalStorageService } from './local-storage.service'

export interface IAppConfig {
  IpfsConnections: IpfsConnection[]
}

@Injectable()
export class AppConfigService {

  private _config: IAppConfig

  constructor(private localStorage: LocalStorageService) {

  }

}
