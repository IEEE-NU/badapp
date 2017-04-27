import { Component } from '@angular/core';
import { FirebaseObjectObservable } from "angularfire2";
import { GameStateService } from "../../services/game-state.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private _gameState: GameStateService, private _router: Router) {
    _gameState.userRef.subscribe(user => {
      if (!user.admin) {
        this._router.navigate(['/home']);
      }
    });
  }

  textchange(event: Event, dbRef: FirebaseObjectObservable<any>) {
    let element = <HTMLInputElement>event.srcElement;
    console.log(element.value);
    dbRef.$ref.set(JSON.parse(element.value));
  }
}
