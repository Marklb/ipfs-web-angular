import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent implements OnInit {

  // The schema that will be used to generate a form
  @Input('schema')
  public schema: any

  @Input('model')
  public model: any

  constructor() { }

  ngOnInit() {
  }

}
