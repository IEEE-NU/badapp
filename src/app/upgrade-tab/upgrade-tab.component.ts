import { Component, OnInit } from '@angular/core';
import { GameStateService } from "../../services/game-state.service";

@Component({
  selector: 'upgrade-tab',
  templateUrl: './upgrade-tab.component.html',
  styleUrls: ['./upgrade-tab.component.scss']
})
export class UpgradeTabComponent implements OnInit {
  constructor(private _gameState: GameStateService) { }

  ngOnInit() {
  }

}
