import { Component, OnInit, Input, Output, EventEmitter, ContentChildren,
  QueryList } from '@angular/core'
import { DocumentSchemaFooterButtonsDirective } from './document-schema-footer-buttons.directive'

@Component({
  selector: 'app-document-schema',
  templateUrl: './document-schema.component.html',
  styleUrls: ['./document-schema.component.scss']
})
export class DocumentSchemaComponent implements OnInit {

  private _jsonSchema: string
  private _jsonModel: string

  @Input('jsonSchema')
  public set jsonSchema(val: any) {
    this._jsonSchema = val
    this.jsonSchemaChange.emit(this._jsonSchema)
  }
  public get jsonSchema() {
    return this._jsonSchema
  }

  @Output('jsonSchemaChange')
  public jsonSchemaChange: EventEmitter<any> = new EventEmitter<any>()

  @Input('jsonModel')
  public set jsonModel(val: any) {
    this._jsonModel = val
    this.jsonModelChange.emit(this._jsonModel)
  }
  public get jsonModel() {
    return this._jsonModel
  }

  @Output('jsonModelChange')
  public jsonModelChange: EventEmitter<any> = new EventEmitter<any>()

  @ContentChildren(DocumentSchemaFooterButtonsDirective) footerBtnTemplates: QueryList<DocumentSchemaFooterButtonsDirective>

  public schemaCardExpanded: boolean = false
  public modelCardExpanded: boolean = false

  constructor() { }

  ngOnInit() { }

}
