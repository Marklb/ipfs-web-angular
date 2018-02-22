import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { NgForm } from '@angular/forms'

export interface IGenerateKeyFormModel {
  name: string
  email: string
}

export interface IFormSubmittedEvent {
  formModel: IGenerateKeyFormModel
}

@Component({
  selector: 'app-generate-key-form',
  templateUrl: './generate-key-form.component.html',
  styleUrls: ['./generate-key-form.component.scss']
})
export class GenerateKeyFormComponent implements OnInit {

  private _inpModelDefault: IGenerateKeyFormModel = {
    name: '',
    email: ''
  }

  public inpModel: IGenerateKeyFormModel = this._inpModelDefault

  @Output('submitted')
  public submitted: EventEmitter<IFormSubmittedEvent> = new EventEmitter()

  private _isGenerating: boolean = false
  private _generatingMessage: string = ''

  @Input('isGenerating')
  set isGenerating(val: boolean) {
    // console.log('set isGenerating: ', val)
    this._isGenerating = val
  }
  get isGenerating() {
    return this._isGenerating
  }
  // public isGenerating: boolean = false

  @Input('generatingMessage')
  set generatingMessage(val: string) {
    // console.log('set generatingMessage: ', val)
    this._generatingMessage = val
  }
  get generatingMessage() {
    return this._generatingMessage
  }
  // public generatingMessage: string = ''

  constructor() { }

  ngOnInit() {
    this.resetForm()
  }

  public resetForm() {
    this.inpModel = this._inpModelDefault
  }

  public onSubmit() {
    const eventObj: IFormSubmittedEvent = {
      formModel: { ...this.inpModel }
     }
    this.submitted.emit(eventObj)
    this.resetForm()
  }

}
