import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation,
  ComponentRef, ViewContainerRef, ComponentFactoryResolver, AfterViewInit,
  OnDestroy, NgZone } from '@angular/core'
import { SignaturePad } from 'angular2-signaturepad/signature-pad'
import { TdJsonFormatterComponent } from '@covalent/core'
import { LayoutService } from 'app/services/layout.service'

@Component({
  selector: 'app-document-editor-demo',
  templateUrl: './document-editor-demo.component.html',
  styleUrls: ['./document-editor-demo.component.scss'],
})
export class DocumentEditorDemoComponent implements OnInit, AfterViewInit, OnDestroy {

  public pageTitle: string = 'Document Editor Demo'

  mySchema = {
    'properties': {
      'firstName': {
        'type': 'string',
        'description': 'First name'
      },
      'lastName': {
        'type': 'string',
        'description': 'Last name'
      },
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
    'required': ['email', 'password', 'rememberMe'],
    'order': [
      'firstName',
      'lastName',
      'email',
      'password',
      'rememberMe'
    ]
  }

  myModel = { email: 'john.doe@example.com' }

  public jsonEditorSchema: string
  public jsonEditorModel: string

  @ViewChild(SignaturePad) signaturePad: SignaturePad

  @ViewChild('schemaFormatter')
  public schemaFormatter: TdJsonFormatterComponent

  private signaturePadOptions: Object = {
    // 'minWidth': 0.5,
    // 'maxWidth': 2.5,
    'canvasWidth': 500,
    'canvasHeight': 300
  }

  public isBootstrap: boolean = false

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.isBootstrap.subscribe((b: boolean) => {
      this.isBootstrap = b
      document.querySelector('html').classList.remove('bootstrap4-scope')
    })

    this.layoutService.setPageTitle('Document Editor Demo')

    this.jsonEditorSchema = JSON.stringify(this.mySchema, null, 2)
    this.jsonEditorModel = JSON.stringify(this.myModel, null, 2)

    if (this.isBootstrap) {
      document.querySelector('html').classList.remove('bootstrap4-scope')
    }
  }

  ngAfterViewInit() {
    if (this.signaturePad) {
      // this.signaturePad is now available
      // this.signaturePad.set('minWidth', 5) // set szimek/signature_pad options at runtime
      this.signaturePad.clear() // invoke functions from szimek/signature_pad API
    }
  }

  ngOnDestroy() {
    document.querySelector('html').classList.add('bootstrap4-scope')
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

  public updateJsonSchema() {
    this.mySchema = JSON.parse(this.jsonEditorSchema)
    this.schemaFormatter.refresh()
  }

  public updateJsonModel() {
    this.myModel = JSON.parse(this.jsonEditorModel)
  }

}
