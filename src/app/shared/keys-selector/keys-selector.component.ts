import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { StoredKeysService } from 'app/services/stored-keys.service'

export interface ISelectedKeysChangeEvent {
  isAdd: boolean
  changedKey: any
  selectedKeys: any
}

@Component({
  selector: 'app-keys-selector',
  templateUrl: './keys-selector.component.html',
  styleUrls: ['./keys-selector.component.scss']
})
export class KeysSelectorComponent implements OnInit {

  @Input('keys')
  public keys: any[] = []

  @Input('selectedKeys')
  public selectedKeys: any[] = []

  @Output('selectedKeysChange')
  public selectedKeysChange: EventEmitter<any> = new EventEmitter<any>()

  constructor(private storedKeysService: StoredKeysService) { }

  ngOnInit() {
    this.storedKeysService.storedKeys.subscribe((keys) => { this.keys = keys })
  }

  public selectKey(key: any) {
    if (!this.isKeySelected(key)) {
      this.selectedKeys.push(key)
      this.selectedKeysChange.emit({
        isAdd: true,
        changedKey: key,
        selectedKeys: this.selectedKeys
      })
    }
  }

  public unselectKey(key: any) {
    const len = this.selectedKeys.length
    this.selectedKeys = this.selectedKeys.filter(x => x.keys.public !== key.keys.public)
    if (len !== this.selectedKeys.length) {
      this.selectedKeysChange.emit({
        isAdd: false,
        changedKey: key,
        selectedKeys: this.selectedKeys
      })
    }
  }

  public isKeySelected(key: any) {
    const item = this.selectedKeys.find(x => x.keys.public === key.keys.public)
    return (item) ? true : false
  }

}
