import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GameStateService } from "../../services/game-state.service";
import { Upgrade, Player } from "../../classes";

@Component({
  selector: 'upgrade-tab',
  templateUrl: './upgrade-tab.component.html',
  styleUrls: ['./upgrade-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpgradeTabComponent {
  private user: Player;
  constructor(public gameState: GameStateService, private cd: ChangeDetectorRef) {
    gameState.userAsync.subscribe(u => {
      this.user = u;
      cd.markForCheck();
    });
  }

  upgradeTrackBy(index: number, upgrade: Upgrade) {
    return upgrade.id;
  }
}
