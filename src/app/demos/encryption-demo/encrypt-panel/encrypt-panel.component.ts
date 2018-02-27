import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-encrypt-panel',
  templateUrl: './encrypt-panel.component.html',
  styleUrls: ['./encrypt-panel.component.scss']
})
export class EncryptPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public onSelectedKeysChange(event: any) {
    console.log('onSelectedKeysChange: ', event)
  }

}
