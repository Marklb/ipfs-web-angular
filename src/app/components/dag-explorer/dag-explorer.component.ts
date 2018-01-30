import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { IpfsService } from '../../services/ipfs.service'

@Component({
  selector: 'app-dag-explorer',
  templateUrl: './dag-explorer.component.html',
  styleUrls: ['./dag-explorer.component.scss']
})
export class DagExplorerComponent implements OnInit {

  @Input('hash') hash: any

  constructor(private ipfsService: IpfsService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe(params => {
      this.hash = params.hash
    })
  }

  ngOnInit() {

  }

  dagInputSearch(hash: any) {
    this.router.navigate(['/dag-explorer', hash])
  }

}
