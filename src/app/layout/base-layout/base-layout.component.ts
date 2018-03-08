import { Component, ChangeDetectorRef, AfterViewInit, ViewChild, TemplateRef,
  HostBinding, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry, MatDialog } from '@angular/material'
import { TdMediaService, TdDigitsPipe, TdLayoutManageListComponent, TdRotateAnimation } from '@covalent/core'
import { DatePipe } from '@angular/common'
import { LayoutService } from 'app/services/layout.service'

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  // animations: [
  //   TdRotateAnimation(),
  // ]
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  routes: Object[] = [{
      icon: 'home',
      route: '.',
      title: 'Home',
    }, {
      icon: 'library_books',
      route: '.',
      title: 'Documentation',
    }, {
      icon: 'computer',
      route: '.',
      title: 'IPFS Utilities',
    }, {
      icon: 'tv',
      route: '.',
      title: 'Demos',
    }
  ]

  usermenu: Object[] = [{
      icon: 'swap_horiz',
      route: '.',
      title: 'Switch account',
    }, {
      icon: 'tune',
      route: '.',
      title: 'Account settings',
    }, {
      icon: 'exit_to_app',
      route: '.',
      title: 'Sign out',
    },
  ]

  navmenu: Object[] = [{
      icon: 'looks_one',
      route: '/base-layout/demos/webmerge',
      title: 'Webmerge',
      description: 'Create file with Webmerge API',
    }, {
      icon: 'looks_two',
      route: '/base-layout/demos/jspdf',
      title: 'jsPDF',
      description: 'View PDF created with jsPDF',
    }, {
      icon: 'looks_3',
      route: '/base-layout/demos/files-upload',
      title: 'Files Upload',
      description: 'Upload files to IPFS',
    }, {
      icon: 'looks_4',
      route: '/base-layout/demos/hash-check',
      title: 'Check Hash',
      description: 'View file with IPFS hash',
    }, {
      icon: 'looks_5',
      route: '/base-layout/demos/digital-signature',
      title: 'Digital Signature',
      description: 'Sign and Verify documents',
    }, {
      icon: 'looks_5',
      route: '/base-layout/demos/encryption',
      title: 'Encryption',
      description: 'Encrypt and Decrypt documents',
    }, {
      icon: 'looks_5',
      route: '/base-layout/demos/document-editor',
      title: 'Document Editor',
      description: 'Document/Schema editor',
    },
  ]

  pageTitle: string = 'Page Title'

  showOutlet: boolean = false

  constructor(public media: TdMediaService,
              public dialog: MatDialog,
              private _changeDetectorRef: ChangeDetectorRef,
              private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer,
              public layoutService: LayoutService) {

    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl
      ('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent.svg'))

    this._iconRegistry.addSvgIconInNamespace('assets', 'theseam_logo',
      this._domSanitizer.bypassSecurityTrustResourceUrl
      ('./assets/test_logo.svg'))

    this._iconRegistry.addSvgIconInNamespace('assets', 'theseam_logo1',
      this._domSanitizer.bypassSecurityTrustResourceUrl
      ('./assets/test_logo.1.svg'))

  }

  ngOnInit(): void {
    this.layoutService.setIsBootstrap(false)
    this.layoutService.setPageTitle('Page Title')
  }

  ngOnDestroy(): void {
    this.layoutService.setIsBootstrap(true)
  }

  ngAfterViewInit(): void {

  }

  onActivate(event: any) {
    console.log('onActivate: ', event)
    this.showOutlet = true
    if (event.pageTitle) {
      this.pageTitle = event.pageTitle
    }
  }

  onDeactivate(event: any) {
    console.log('onDeactivate: ', event)
    this.showOutlet = false
    if (event.pageTitle) {
      this.pageTitle = 'Page Title'
    }
  }

}
