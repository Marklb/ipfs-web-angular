import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-card-widget',
  templateUrl: './card-widget.component.html',
  styleUrls: ['./card-widget.component.scss']
})
export class CardWidgetComponent implements OnInit {

  private _expanded: boolean = false

  @Input('expanded')
  public set expanded(val: boolean) {
    this._expanded = val
    this.expandedChange.emit(this._expanded)
  }
  public get expanded(): boolean {
    return this._expanded
  }

  @Output('expandedChange')
  public expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Input('title')
  public title: string

  constructor() { }

  ngOnInit() { }

}
