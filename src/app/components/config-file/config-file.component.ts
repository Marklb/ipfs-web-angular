import { Component, OnInit } from '@angular/core'
import { IpfsService, IpfsEnvironment, IpfsConnection } from '../../services/ipfs.service'

@Component({
  selector: 'app-config-file',
  templateUrl: './config-file.component.html',
  styleUrls: ['./config-file.component.scss']
})
export class ConfigFileComponent implements OnInit {

  public configFile: any

  constructor(public ipfsService: IpfsService) {
    this.ipfsService.ipfsConnectionChange.subscribe((conn) => {
      this.loadConfig()
    })
  }

  ngOnInit() {
    this.loadConfig()
  }

  public loadConfig() {
    this.ipfsService.ipfs.config.get().then((res) => {
      console.log(res)
      // console.log(res.toString())
      // console.log(JSON.parse(res.toString()))
      const ipfsConn: IpfsConnection = this.ipfsService.getIpfsConnection()
      const ipfsEnv: IpfsEnvironment = ipfsConn.environment
      if (ipfsEnv === IpfsEnvironment.Local) {
        this.configFile = JSON.parse(res.toString())
      } else {
        this.configFile = res
      }
    })
    .catch((err) => { console.log(err) })
  }

  public saveConfig() {

  }

}
