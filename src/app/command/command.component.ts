import { Component, OnInit } from '@angular/core';
import { GameStateService } from "../../services/game-state.service";

@Component({
  selector: 'command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {
  constructor(public gameState: GameStateService) { }

  ngOnInit() {
  }
}
