import { Component, OnInit } from '@angular/core';
import { Player } from "../../classes";
import { GameStateService } from "../../services/game-state.service";
import { FirebaseListObservable, AngularFire } from "angularfire2";

@Component({
  selector: 'leaderboard-panel',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: FirebaseListObservable<any>;
  orderBy: string = 'nuggets';
  constructor(private af: AngularFire, private _gameState: GameStateService) {
    this.leaderboard = this.af.database.list('/users');
  }

  ngOnInit() {
  }

  playerTrackBy(index: number, player: Player) {
    return player.id;
  }
}
