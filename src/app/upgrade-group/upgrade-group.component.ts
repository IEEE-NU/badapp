import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'upgrade-group',
  templateUrl: './upgrade-group.component.html',
  styleUrls: ['./upgrade-group.component.scss']
})
export class UpgradeGroupComponent implements OnInit {
  @Input() upgrades: object[];
  @Input() name: string;

  constructor() {
  }

  ngOnInit() {
  }

}
