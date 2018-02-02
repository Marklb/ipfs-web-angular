import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import * as shape from 'd3-shape'
import { IpfsService } from '../../services/ipfs.service'

@Component({
  selector: 'app-dag-graph',
  templateUrl: './dag-graph.component.html',
  styleUrls: ['./dag-graph.component.scss']
})
export class DagGraphComponent implements OnInit {
  // version = APP_VERSION

  loadingData: boolean = true

  theme = 'dark'
  chartType = 'directed-graph'
  chartGroups: any
  chart: any
  realTimeData: boolean = false
  countries: any[]
  graph: { links: any[], nodes: any[] }
  hierarchialGraph: { links: any[], nodes: any[] }

  view: any[]
  // width: number = 700
  // height: number = 300
  fitContainer: boolean = true
  autoZoom: boolean = false

  // options
  showLegend = false
  orientation: string = 'LR' // LR, RL, TB, BT
  orientations: any[] = [
    {
      label: 'Left to Right',
      value: 'LR'
    }, {
      label: 'Right to Left',
      value: 'RL'
    }, {
      label: 'Top to Bottom',
      value: 'TB'
    }, {
      label: 'Bottom to Top',
      value: 'BT'
    }
  ]

  // line interpolation
  curveType: string = 'Linear'
  curve: any = shape.curveLinear
  interpolationTypes = [
    'Bundle', 'Cardinal', 'Catmull Rom', 'Linear', 'Monotone X',
    'Monotone Y', 'Natural', 'Step', 'Step After', 'Step Before'
  ]

  colorSets: any
  colorScheme: any = {
    name: 'picnic',
    selectable: false,
    group: 'Ordinal',
    domain: [
      '#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8'
    ]
  }
  schemeType: string = 'ordinal'
  selectedColorScheme: string

  // hierarchialGraph = {
  //   nodes: [
  //     {
  //       id: 'start',
  //       label: 'start'
  //     },
  //     {
  //       id: '1',
  //       label: 'Query ThreatConnect',
  //     },
  //     {
  //       id: '2',
  //       label: 'Query XForce',
  //     },
  //     {
  //       id: '3',
  //       label: 'Format Results'
  //     },
  //     {
  //       id: '4',
  //       label: 'Search Splunk'
  //     },
  //     {
  //       id: '5',
  //       label: 'Block LDAP'
  //     },
  //     {
  //       id: '6',
  //       label: 'Email Results'
  //     }
  //   ],
  //   links: [
  //     {
  //       source: 'start',
  //       target: '1',
  //     }, {
  //       source: 'start',
  //       target: '2'
  //     }, {
  //       source: '1',
  //       target: '3',
  //     }, {
  //       source: '2',
  //       target: '4'
  //     }, {
  //       source: '2',
  //       target: '6'
  //     }, {
  //       source: '3',
  //       target: '5'
  //     }
  //   ]
  // }

  private _hash: any

  @Input('hash')
  set hash(val: any) {
    this._hash = val
    this._buildDAG(val)
  }
  get hash() {
    return this._hash
  }

  constructor(private ipfsService: IpfsService,
              private route: ActivatedRoute,
              private router: Router) {
    // const h = route.snapshot.params.hash
    // if (h !== undefined) { this.hash = h }
    this.route.params.subscribe(params => {
      this.hash = params.hash
    })
  }

  ngOnInit() {

  }

  select(data) {
    console.log('Item clicked', data)
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry)
  }

  dagInputSearch(hash: any) {
    this.router.navigate(['/dag-graph', hash])
  }

  private _buildDAG(hash: any): void {
    if (hash === undefined) { return }

    const dagTmp = {
      count: 0,
      nodes: [],
      links: []
    }

    this.ipfsService.ipfs.object.get(hash).then((res: any) => {
      // console.log('object.get node: ', res)
      // console.log('object.get nodeJSON: ', res.toJSON())
      const nodeJson = res.toJSON()
      // console.dir(res.constructor.name)
      // console.log('--------------------------------')
      // this.printDAGLinks(res, 0)
      // console.log('', `${nodeJson.multihash} /`)
      this.printDAG(nodeJson, 0, dagTmp, undefined).then(() => {
        console.log(dagTmp)
        this.hierarchialGraph = dagTmp
        this.loadingData = false
      })
    })
  }

  private async printDAG(obj: any, n: number, dagTmp: any, _prevId: string): Promise<any> {
    const tab = this.tabStr(n)
    // console.log('printDAG: ', obj, dagTmp)

    if (_prevId === undefined) {
      console.log('', `${obj.multihash} /`)
      dagTmp.nodes.push({
        id: 'start',
        label: `${obj.multihash} /`
      })
    }

    const prevId = (_prevId) ? _prevId : 'start'



    for (const link of obj.links) {
      // console.log(tab, link)
      // console.log(tab, link.multihash)
      const node = await this.ipfsService.ipfs.object.get(link.multihash)
      // console.log(tab, link)
      // console.log(tab, 'node: ', node)
      // console.log(tab, node.links)
      // console.log(tab, 'nodeJSON: ', node.toJSON())
      // console.log(tab, `${link.multihash} /${link.name}`)

      const nodeId = `${dagTmp.nodes.length}`
      console.log(tab, `${link.multihash} /${link.name} ~ ${prevId} -> ${nodeId}`)
      dagTmp.nodes.push({
        id: nodeId,
        label: `${link.multihash} /${link.name}`
      })
      dagTmp.links.push({
        source: `${prevId}`,
        target: `${nodeId}`
      })


      if (node.links.length > 0) {
        await this.printDAG(node.toJSON(), n + 1, dagTmp, nodeId)
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
