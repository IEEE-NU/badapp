import { Component } from '@angular/core';
import { Player } from "../../classes";
import { GameStateService } from "../../services/game-state.service";
import { FirebaseListObservable, AngularFire } from "angularfire2";

@Component({
  selector: 'leaderboard-panel',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {
  leaderboard: FirebaseListObservable<any>;
  orderBy: string = 'nuggets';
  constructor(private af: AngularFire, public gameState: GameStateService) {
    this.leaderboard = this.af.database.list('/users');
  }

  playerTrackBy(index: number, player: Player) {
    return player.id;
  }
}
