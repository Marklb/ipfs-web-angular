import { Component, OnInit } from '@angular/core'
import { IpfsService, IPFSEnvironments } from '../../services/ipfs.service'

@Component({
  selector: 'app-config-file',
  templateUrl: './config-file.component.html',
  styleUrls: ['./config-file.component.scss']
})
export class ConfigFileComponent implements OnInit {

  private configFile: any

  constructor(private ipfsService: IpfsService) { }

  ngOnInit() {
    this.ipfsService.ipfs.config.get().then((res) => {
      console.log(res)
      // console.log(res.toString())
      // console.log(JSON.parse(res.toString()))
      if (this.ipfsService.ipfsEnvironment === IPFSEnvironments.Local) {
        this.configFile = JSON.parse(res.toString())
      } else {
        this.configFile = res
      }
    })
    .catch((err) => { console.log(err) })
  }

}
