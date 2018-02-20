import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { APP_BASE_HREF, Location } from '@angular/common'

import { routing } from './app.routing'

import { AccordionModule } from 'ngx-bootstrap/accordion'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { ModalModule } from 'ngx-bootstrap/modal'
import { FlexLayoutModule } from '@angular/flex-layout'
import { NgxGraphModule } from '@swimlane/ngx-graph'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { TreeModule } from 'ng2-tree'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar'
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar'

import { SharedModule } from './shared/shared.module'
import { DemosModule } from './demos/demos.module'

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
import { CryptoService } from './services/crypto.service'

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {

}


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
    FlexLayoutModule,
    NgxGraphModule,
    TreeModule,
    PerfectScrollbarModule,
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    SharedModule,
    DemosModule,
    NgxDatatableModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    IpfsService,
    LayoutService,
    StoredKeysService,
    CryptoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
