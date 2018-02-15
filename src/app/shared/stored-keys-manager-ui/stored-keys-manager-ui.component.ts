import { Component, OnInit } from '@angular/core'

import { StoredKeysService } from 'app/services/stored-keys.service'

@Component({
  selector: 'app-stored-keys-manager-ui',
  templateUrl: './stored-keys-manager-ui.component.html',
  styleUrls: ['./stored-keys-manager-ui.component.scss']
})
export class StoredKeysManagerUiComponent implements OnInit {

  public keys: any[] = []

  constructor(private storedKeysService: StoredKeysService) {
    this.storedKeysService.storedKeys.subscribe((keys) => {
      this.keys = keys
    })
  }

  ngOnInit() {
  }

  public onClickPrivateKey(event: any, key: any) {
    console.log(key.keys.private)
  }

  public onClickPublicKey(event: any, key: any) {
    console.log(key.keys.public)
  }

}
