import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFire } from 'angularfire2';

import { AuthService } from "../../services/auth.service";
import { GameStateService } from "../../services/game-state.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [GameStateService]
})
export class HomePage implements OnInit, OnDestroy {
  tabLinks = [
    { label: 'Command', link: 'command' },
    { label: 'Upgrade', link: 'upgrade' },
  ];
  activeTab = 0;

  constructor(public af: AngularFire, private _auth: AuthService, private _router: Router, public _gameState: GameStateService) {
    console.log("HomePage: constructor");
  }

  ngOnInit(): void {
    console.log("HomePage: onInit");
  }

  ngOnDestroy(): void {
    console.log("HomePage: onDestroy");
  }

  signOut(): void {
    this._auth.signOut();
  }
}
