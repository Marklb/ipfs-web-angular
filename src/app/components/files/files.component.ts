import { Component, OnInit } from '@angular/core'
import { IpfsService, IPFSEnvironments } from '../../services/ipfs.service'
import * as dagPB from 'ipld-dag-pb'
// const dagPB = require('ipld-dag-pb')
const DAGNode = dagPB.DAGNode
const DAGLink = dagPB.DAGLink

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  public pinnedFiles: any[]
  public localRefs: any[]

  public pinnedFilesExpanded: boolean = true
  public pinnedFilesExpanded2: boolean = true
  public localRefsExpanded: boolean = true

  public implementationMissing: boolean = false

  constructor(public ipfsService: IpfsService) { }

  ngOnInit() {
    // this.loadFiles()
    this.ipfsService.ipfsEnvironmentExtended.subscribe((env) => {
      if (this.ipfsService.ipfsEnvironment === IPFSEnvironments.Browser) {
        this.implementationMissing = true
      } else {
        this.loadFiles()
      }
    })
  }

  public loadFiles() {
    this.ipfsService.ipfs.refs.local().then((res) => {
      // console.log('refs.local: ', res)
      this.localRefs = res
    })

    this.ipfsService.ipfs.pin.ls().then((res) => {
      console.log('pin.ls: ', res)
      this.pinnedFiles = res
    })

    this.ipfsService.ipfs.object.get('QmWBqSjwXJaz8T7oFBsq2Tw8QGc81Ld3XpMDtTT3z5tUvd').then((res: typeof DAGNode) => {
      // console.log('object.get node: ', res)
      // console.log('object.get nodeJSON: ', res.toJSON())
      const nodeJson = res.toJSON()
      // console.dir(res.constructor.name)
      // console.log('--------------------------------')
      // this.printDAGLinks(res, 0)
      // console.log('', `${nodeJson.multihash} /`)
      this.printDAG(nodeJson, 0)
    })
  }

  private async printDAG(obj: any, n: number): Promise<any> {
    const tab = this.tabStr(n)
    // console.log('printDAG: ', obj)
    for (const link of obj.links) {
      // console.log(tab, link)
      // console.log(tab, link.multihash)
      const node = await this.ipfsService.ipfs.object.get(link.multihash)
      // console.log(tab, link)
      // console.log(tab, 'node: ', node)
      // console.log(tab, node.links)
      // console.log(tab, 'nodeJSON: ', node.toJSON())
      // console.log(tab, `${link.multihash} /${link.name}`)
      if (node.links.length > 0) {
        await this.printDAG(node.toJSON(), n + 1)
      }
    }
  }

  private async printDAGLinks(obj: typeof DAGNode, n: number): Promise<any> {
    // console.log(obj)
    for (const link of obj.links) {
      // console.log(link)
      // console.log(link.multihash)
      const node = await this.ipfsService.ipfs.object.get(link.multihash)
      // console.log(link)
      // console.log('node: ', node)
      // console.log('nodeJSON: ', node.toJSON())
      // console.log(`${node.multihash} /${link.name}`)
      if (node.links > 0) {
        // this.printDAGLinks(node, 0)
      }
    }
  }

  private tabStr(n: number): string {
    const tabSize = 4
    let s = ''
    for (let i = 0; i < (n * tabSize); i++) { s += ' ' }
    return s
  }

}
