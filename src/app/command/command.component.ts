import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GameStateService } from "../../services/game-state.service";

@Component({
  selector: 'command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandComponent implements OnInit {
  constructor(public gameState: GameStateService) { }

  ngOnInit() {
  }
}
