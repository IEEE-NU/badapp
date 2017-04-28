import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MdButton } from "@angular/material";
import { Player } from "../../classes";
import { GameStateService } from "../../services/game-state.service";

@Component({
  selector: 'player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerCardComponent implements OnInit {
  @Input() player: Player;
  @ViewChild("attack") attackButton: MdButton;
  @ViewChild("help") helpButton: MdButton;
  constructor(private gameState: GameStateService) { }

  ngOnInit() {
    const isSelf = this.player.id === this.gameState.user.id;
    this.attackButton.disabled = isSelf;
    this.helpButton.disabled = isSelf;
  }

  statusClass() {
    if (this.player.attacking === this.gameState.user.id) {
      return 'attacking';
    } else if (this.player.helping === this.gameState.user.id) {
      return 'helping';
    }
  }
}
