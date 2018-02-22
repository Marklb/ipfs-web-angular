import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core'
import { StoredKeysService } from 'app/services/stored-keys.service'
import { CryptoService } from 'app/services/crypto.service'
import { IFormSubmittedEvent } from './generate-key-form/generate-key-form.component'
import { ModalDirective } from 'ngx-bootstrap/modal'
import * as openpgp from 'openpgp'
// import * as kbpgp from 'kbpgp'
// const F = kbpgp['const'].openpgp
declare const kbpgp: any

@Component({
  selector: 'app-stored-keys-manager-ui',
  templateUrl: './stored-keys-manager-ui.component.html',
  styleUrls: ['./stored-keys-manager-ui.component.scss']
})
export class StoredKeysManagerUiComponent implements OnInit {

  public modalConfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    show: true
  }

  public _isModalShown: boolean = false

  public get isModalShown(): boolean { return this._isModalShown }

  @ViewChild('modalDirectiveRef') modalDirectiveRef: ModalDirective

  public _isModalOnly: boolean = false

  @Input('isModalOnly')
  public set isModalOnly(val: boolean) { this._isModalOnly = val }
  public get isModalOnly(): boolean { return this._isModalOnly }

  public _expanded: boolean = true
  public _hasSetInitialExpand: boolean = false

  @Input('expanded')
  public set expanded(val: boolean) { this._expanded = val }
  public get expanded(): boolean { return this._expanded }

  @Input('initialExpand')
  public set initialExpand(val: boolean) {
    if (!this._hasSetInitialExpand) {
      this._expanded = val
      this._hasSetInitialExpand = true
    }
  }
  public get initialExpand(): boolean {
    return this._expanded
  }

  public _newKeyExpanded: boolean = false
  public _storedKeysExpanded: boolean = false

  public keys: any[] = []

  constructor(private storedKeysService: StoredKeysService,
              private cryptoService: CryptoService) {
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

  public onClickRemoveKey(event: any, key: any) {
    this.storedKeysService.removeKeyFromLocalStorage(key)
  }

  public onClickResetStoredKeys(event: any) {
    this.storedKeysService.resetLocalStorageToDefault()
  }

  public onClickTitleBar(event: any) {
    this._expanded = !this._expanded
  }

  public onSubmittedGenerateForm(event: IFormSubmittedEvent) {
    console.log('onSubmitGenerateForm: ', event)
    const formModel = event.formModel

    // OpenPGP
    this.cryptoService.generateKey({
      userIds: [{ name: formModel.name, email: formModel.email }],
      numBits: 4096,
      passphrase: 'theseam'
    }).then((keys) => {
      const publicKey = openpgp.key.readArmored(keys.publicKey)
      const keyEntry = {
        userIds: [ { userId: publicKey.keys[0].users[0].userId.userid } ],
        keys: {
          private: keys.privateKey,
          public: keys.publicKey
        }
      }
      this.storedKeysService.storeNewKey(keyEntry, true)
    })

    // KBPGP
    // // tslint:disable:no-bitwise
    // const opts = {
    //   userid: `${formModel.name} <${formModel.email}>`,
    //   primary: {
    //     nbits: 4096,
    //     flags: F.certify_keys | F.sign_data | F.auth | F.encrypt_comm | F.encrypt_storage,
    //     expire_in: 0  // never expire
    //   },
    //   subkeys: [
    //     {
    //       nbits: 2048,
    //       flags: F.sign_data,
    //       expire_in: 86400 * 365 * 8 // 8 years
    //     }, {
    //       nbits: 2048,
    //       flags: F.encrypt_comm | F.encrypt_storage,
    //       expire_in: 86400 * 365 * 8
    //     }
    //   ]
    // }
    // // tslint:enable:no-bitwise


    // const opts = {
    //   userid: `${formModel.name} <${formModel.email}>`
    // }

    // // const my_asp = new kbpgp.ASP({
    // //   progress_hook: function(o) {
    // //     console.log('I was called with progress!', o)
    // //   }
    // // })

    // // const opts = {
    // //   asp: my_asp,
    // //   userid: `${formModel.name} <${formModel.email}>`,
    // //   primary: {
    // //     nbits: 4096
    // //   },
    // //   subkeys: []
    // // }
    // this.cryptoService.generateKey(opts).then((key) => {
    //   console.log('new key: ', key)
    //   const keyEntry = {
    //     userIds: [{ name: formModel.name, email: formModel.email }],
    //     keys: {
    //       private: key.privateKey,
    //       public: key.publicKey
    //     }
    //   }
    //   this.storedKeysService.storeNewKey(keyEntry, true)
    // })
  }

  onClickToggleModal(event: any) {
    event.preventDefault()
    event.stopPropagation()

    this.toggleModal()
  }

  toggleModal(): void {
    if (this.isModalShown) {
      this.hideModal()
    } else {
      this.showModal()
    }
  }

  showModal(): void {
    this._isModalShown = true
  }

  hideModal(): void {
    this.modalDirectiveRef.hide()
  }

  onHidden(): void {
    this._isModalShown = false
  }

}
