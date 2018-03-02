import { Component, OnInit } from '@angular/core'
import { LocalStorageService } from 'app/services/local-storage.service'

@Component({
  selector: 'app-settings-manager',
  templateUrl: './settings-manager.component.html',
  styleUrls: ['./settings-manager.component.scss']
})
export class SettingsManagerComponent implements OnInit {

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit() {
  }

}
