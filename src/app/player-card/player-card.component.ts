import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MdButton } from "@angular/material";
import { Player } from "../../classes";

@Component({
  selector: 'player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {
  @Input() player: Player;
  @Input() canAttack: boolean;
  @Output() onAttack = new EventEmitter<Player>();
  @ViewChild(MdButton) attackButton: MdButton;
  constructor() { }

  ngOnInit() {
    console.log(this.canAttack);
    this.attackButton.disabled = !this.canAttack;
  }

  attackPlayer() {
    this.onAttack.emit(this.player);
  }
}
