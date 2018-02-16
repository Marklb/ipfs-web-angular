import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

import fontawesome from '@fortawesome/fontawesome'
import * as faAngleRight from '@fortawesome/fontawesome-free-solid/faAngleRight'
import * as faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
import * as faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp'
import * as faKey from '@fortawesome/fontawesome-free-solid/faKey'
import * as faCaretSquareLeft from '@fortawesome/fontawesome-free-regular/faCaretSquareLeft'
import * as faCaretSquareRight from '@fortawesome/fontawesome-free-regular/faCaretSquareRight'

fontawesome.library.add(faAngleRight)
fontawesome.library.add(faAngleDown)
fontawesome.library.add(faArrowUp)
fontawesome.library.add(faKey)
fontawesome.library.add(faCaretSquareLeft)
fontawesome.library.add(faCaretSquareRight)

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err))
