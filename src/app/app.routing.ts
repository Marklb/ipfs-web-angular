import { RouterModule, Routes } from '@angular/router'

import { DemosModule } from './demos/demos.module'

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
import { DemosComponent } from 'app/demos/demos.component'
import { DocumentEditorComponent } from './document-editor/document-editor.component'

import { demosRoutes } from './demos/demos.routing'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'editor', component: DocumentEditorComponent
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
      { path: 'dag-explorer', component: DagExplorerComponent },
      {
        path: 'demos',
        component: DemosComponent,
        children: [...demosRoutes]
      }
    ]
  },
  // { path: '**', component: PageNotFoundComponent }
]

export const routing = RouterModule.forRoot(routes,
  {
    useHash: true,
    // enableTracing: true // <-- debugging purposes only
  }
)
