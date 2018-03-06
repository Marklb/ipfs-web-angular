import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation,
  ComponentRef, ViewContainerRef, ComponentFactoryResolver, AfterViewInit,
  OnDestroy, NgZone } from '@angular/core'
import { SignaturePad } from 'angular2-signaturepad/signature-pad'

@Component({
  selector: 'app-document-editor-demo',
  templateUrl: './document-editor-demo.component.html',
  styleUrls: ['./document-editor-demo.component.scss'],
})
export class DocumentEditorDemoComponent implements OnInit, AfterViewInit {

  mySchema = {
    'properties': {
      'email': {
        'type': 'string',
        'description': 'email',
        'format': 'email'
      },
      'password': {
        'type': 'string',
        'description': 'Password'
      },
      'rememberMe': {
        'type': 'boolean',
        'default': false,
        'description': 'Remember me'
      }
    },
    'required': ['email', 'password', 'rememberMe']
  }

  myModel = { email: 'john.doe@example.com' }

  public jsonEditorSchema: string
  public jsonEditorModel: string

  @ViewChild(SignaturePad) signaturePad: SignaturePad

  private signaturePadOptions: Object = {
    // 'minWidth': 0.5,
    // 'maxWidth': 2.5,
    'canvasWidth': 500,
    'canvasHeight': 300
  }

  constructor() { }

  ngOnInit() {
    this.jsonEditorSchema = JSON.stringify(this.mySchema, null, 2)
    this.jsonEditorModel = JSON.stringify(this.myModel, null, 2)
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    // this.signaturePad.set('minWidth', 5) // set szimek/signature_pad options at runtime
    this.signaturePad.clear() // invoke functions from szimek/signature_pad API
  }

  public drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL())
  }

  public drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    // console.log('begin drawing')
  }

  public updateSchema() {
    this.mySchema = JSON.parse(this.jsonEditorSchema)
    this.myModel = JSON.parse(this.jsonEditorModel)
  }

}
