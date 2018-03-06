import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { APP_BASE_HREF, Location } from '@angular/common'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'

import { routing } from './app.routing'

import { AccordionModule } from 'ngx-bootstrap/accordion'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { ModalModule } from 'ngx-bootstrap/modal'
import { AlertModule } from 'ngx-bootstrap/alert'
import { FlexLayoutModule } from '@angular/flex-layout'
import { NgxGraphModule } from '@swimlane/ngx-graph'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { TreeModule } from 'ng2-tree'
import { TrumbowygModule } from 'ng2-lazy-trumbowyg'
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from 'angular2-schema-form'

import { SharedModule } from './shared/shared.module'
import { DemosModule } from './demos/demos.module'
import { LayoutModule } from 'app/layout/layout.module'

import { AppComponent } from './app.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { HomeComponent } from './components/home/home.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { SideNavComponent } from './components/side-nav/side-nav.component'
import { TopNavComponent } from './components/top-nav/top-nav.component'
import { PeersListComponent } from './components/peers-list/peers-list.component'
import { ConfigFileComponent } from './components/config-file/config-file.component'
import { FilesComponent } from './components/files/files.component'
import { FilesListComponent } from './components/files-list/files-list.component'
import { DagGraphComponent } from './components/dag-graph/dag-graph.component'
import { DagExplorerComponent } from './components/dag-explorer/dag-explorer.component'
import { DagExplorerFilesListComponent } from './components/dag-explorer-files-list/dag-explorer-files-list.component'
import { PinnedFilesComponent } from './components/pinned-files/pinned-files.component'

import { IpfsService } from './services/ipfs.service'
import { LayoutService } from './services/layout.service'
import { StoredKeysService } from './services/stored-keys.service'
import { CryptoService } from './services/crypto/crypto.service'
import { LoadExternalFilesService } from './services/load-external-files.service'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    PageNotFoundComponent,
    SideNavComponent,
    TopNavComponent,
    PeersListComponent,
    ConfigFileComponent,
    FilesComponent,
    FilesListComponent,
    DagGraphComponent,
    DagExplorerComponent,
    DagExplorerFilesListComponent,
    PinnedFilesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    FlexLayoutModule,
    NgxGraphModule,
    TreeModule,
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    SharedModule,
    DemosModule,
    NgxDatatableModule,
    TrumbowygModule.forRoot({
      plugins: [
        'colors', 'noembed', 'preformatted', 'pasteimage', 'upload', 'base64', 'template', 'table'
      ],
      version: '2.9.4'
    }),
    SchemaFormModule.forRoot(),
    LayoutModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' },
    IpfsService,
    LayoutService,
    StoredKeysService,
    CryptoService,
    LoadExternalFilesService,
    {provide: WidgetRegistry, useClass: DefaultWidgetRegistry}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
