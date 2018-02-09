import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FlexLayoutModule } from '@angular/flex-layout'
import { FileDropModule } from 'ngx-file-drop'

import { HashCheckDemoComponent } from './hash-check-demo.component'

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FileDropModule
  ],
  declarations: [HashCheckDemoComponent]
})
export class HashCheckDemoModule { }
