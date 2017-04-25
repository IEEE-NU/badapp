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
  @Output() onHelp = new EventEmitter<Player>();
  @ViewChild("attack") attackButton: MdButton;
  @ViewChild("help") helpButton: MdButton;
  constructor() { }

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
}
