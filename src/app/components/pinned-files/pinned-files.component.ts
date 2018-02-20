import { Component, OnInit, Input } from '@angular/core'
import { IpfsService } from 'app/services/ipfs.service'

@Component({
  selector: 'app-pinned-files',
  templateUrl: './pinned-files.component.html',
  styleUrls: ['./pinned-files.component.scss']
})
export class PinnedFilesComponent implements OnInit {

  loadingIndicator: boolean = true

  private _originalRows = []
  public _rows = []

  @Input('rows')
  public set rows(val: any[]) {
    this._originalRows = val
    this._rows = val
  }
  public get rows() {
    return this._rows
  }

  constructor(public ipfsService: IpfsService) { }

  ngOnInit() { }

  onTableRowActivate(event: any) {

  }

  onSearchKeypress(event: any) {

  }

  onSearchKeydown(event: any) {

  }

  onSearchKeyup(event: any) {
    const targetValue = event.target.value.toLowerCase()
    this._rows = this._originalRows.filter(row =>
      row.hash.toLowerCase().indexOf(targetValue) !== -1
      || row.type.toLowerCase().indexOf(targetValue) !== -1)
  }

}
