import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { IpfsService } from '../../services/ipfs.service'

@Component({
  selector: 'app-dag-explorer-files-list',
  templateUrl: './dag-explorer-files-list.component.html',
  styleUrls: ['./dag-explorer-files-list.component.scss']
})
export class DagExplorerFilesListComponent implements OnInit {

  public objJson: any
  public dragging: boolean = false
  public _mx: number
  public _my: number

  public _hash: any

  @Input('hash')
  set hash(val: any) {
    this._hash = val
    this._updateData()
  }
  get hash() {
    return this._hash
  }

  @Output('rowClick') rowClick = new EventEmitter<any>()

  constructor(public ipfsService: IpfsService) { }

  ngOnInit() {
  }

  onMouseDownTableRow(event: any) {
    // console.log('onMouseDownTableRow: ', event)
    this.dragging = false
    this._mx = event.screenX
    this._my = event.screenY
  }

  onMouseMoveTableRow(event: any) {
    // console.log('onMouseMoveTableRow: ', event)
    if (Math.abs(this._mx - event.screenX) > 5 || Math.abs(this._my - event.screenY) > 5) {
      this.dragging = true
    }
  }

  onMouseUpTableRow(event: any) {
    // console.log('onMouseUpTableRow: ', event, this.dragging)
  }

  onClickTableRow(event: any, data: any) {
    // console.log('onClickTableRow: ', event, this.dragging)
    if (!this.dragging) {
      // console.log(data)
      this.rowClick.emit(data)
    }
  }

  private async _updateData(): Promise<any> {
    const obj = await this.ipfsService.ipfs.object.get(this.hash)
    // console.log(obj)
    // console.log(obj.toJSON())
    this.objJson = obj.toJSON()
    // console.log(this.objJson.data.toString())
  }

}
