import { Component, OnInit } from '@angular/core'
import { IpfsService } from '../../services/ipfs.service'

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit {

  constructor(private ipfsService: IpfsService) { }

  ngOnInit() {
  }

}
