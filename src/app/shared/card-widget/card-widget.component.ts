import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-card-widget',
  templateUrl: './card-widget.component.html',
  styleUrls: ['./card-widget.component.scss']
})
export class CardWidgetComponent implements OnInit {

  @Input('expanded')
  public expanded: boolean = false

  @Input('title')
  public title: string

  constructor() { }

  ngOnInit() { }

}
