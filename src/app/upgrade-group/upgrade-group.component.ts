import { Component, OnInit, Input } from '@angular/core';
import { FirebaseObjectObservable } from "angularfire2";

@Component({
  selector: 'upgrade-group',
  templateUrl: './upgrade-group.component.html',
  styleUrls: ['./upgrade-group.component.scss']
})
export class UpgradeGroupComponent implements OnInit {
  @Input() upgrades: FirebaseObjectObservable<any>;

  constructor() {
  }

  ngOnInit() {
  }

}
