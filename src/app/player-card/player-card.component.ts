import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Player } from "../../classes";

@Component({
  selector: 'player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {
  @Input() player: Player;
  @Output() onAttack = new EventEmitter<Player>();
  constructor() { }

  ngOnInit() {
  }

  attackPlayer() {
    this.onAttack.emit(this.player);
  }
}
