import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'

@Component({
  selector: 'app-encryption-demo',
  templateUrl: './encryption-demo.component.html',
  styleUrls: ['./encryption-demo.component.scss']
})
export class EncryptionDemoComponent implements OnInit {

  public encryptedFiles: any[] = []

  constructor() { }

  ngOnInit() { }

  public onFileEncrypted(event: any) {
    this.encryptedFiles.push(event)
  }

}
