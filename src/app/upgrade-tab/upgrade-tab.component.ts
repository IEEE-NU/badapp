import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GameStateService } from "../../services/game-state.service";
import { Upgrade } from "../../classes";

@Component({
  selector: 'upgrade-tab',
  templateUrl: './upgrade-tab.component.html',
  styleUrls: ['./upgrade-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpgradeTabComponent {
  constructor(public gameState: GameStateService) {
  }

  upgradeTrackBy(index: number, upgrade: Upgrade) {
    return upgrade.id;
  }
}
