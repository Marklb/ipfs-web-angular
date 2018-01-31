import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { FlexLayoutModule } from '@angular/flex-layout'
import { NgxGraphModule } from '@swimlane/ngx-graph'
import { TreeModule } from 'ng2-tree'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar'
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar'

import { AppComponent } from './app.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { HomeComponent } from './components/home/home.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { SideNavComponent } from './components/side-nav/side-nav.component'
import { PeersListComponent } from './components/peers-list/peers-list.component'
import { ConfigFileComponent } from './components/config-file/config-file.component'
import { FilesComponent } from './components/files/files.component'
import { FilesListComponent } from './components/files-list/files-list.component'
import { DagGraphComponent } from './components/dag-graph/dag-graph.component'
import { DagExplorerComponent } from './components/dag-explorer/dag-explorer.component'
import { DagExplorerFilesListComponent } from './components/dag-explorer-files-list/dag-explorer-files-list.component'

import { IpfsService } from './services/ipfs.service'

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {

}

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'peers', component: PeersListComponent },
      { path: 'config', component: ConfigFileComponent },
      { path: 'files', component: FilesComponent },
      { path: 'dag-graph/:hash', component: DagGraphComponent },
      { path: 'dag-graph', component: DagGraphComponent },
      { path: 'dag-explorer/:hash', component: DagExplorerComponent },
      { path: 'dag-explorer', component: DagExplorerComponent }
    ]
  },
  // { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    PageNotFoundComponent,
    SideNavComponent,
    PeersListComponent,
    ConfigFileComponent,
    FilesComponent,
    FilesListComponent,
    DagGraphComponent,
    DagExplorerComponent,
    DagExplorerFilesListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    FlexLayoutModule,
    NgxGraphModule,
    TreeModule,
    PerfectScrollbarModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    IpfsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
