import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MdButton } from "@angular/material";
import { Player } from "../../classes";
import { GameStateService } from "../../services/game-state.service";

@Component({
  selector: 'player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {
  @Input() player: Player;
  @Input() canAttack: boolean;
  @Output() onAttack = new EventEmitter<Player>();
  @Output() onHelp = new EventEmitter<Player>();
  @ViewChild("attack") attackButton: MdButton;
  @ViewChild("help") helpButton: MdButton;
  constructor(private _gameState: GameStateService) { }

  ngOnInit() {
    this.attackButton.disabled = !this.canAttack;
    this.helpButton.disabled = !this.canAttack;
  }

  attackPlayer() {
    this.onAttack.emit(this.player);
  }

  helpPlayer() {
    this.onHelp.emit(this.player);
  }

  statusClass() {
    if (this.player.attacking === this._gameState.user.id) {
      return 'attacking';
    } else if (this.player.helping === this._gameState.user.id) {
      return 'helping';
    }
  }
}
