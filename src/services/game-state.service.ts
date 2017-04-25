import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, AngularFire } from "angularfire2";
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "./auth.service";
import { Player } from "../classes";

@Injectable()
export class GameStateService {
  public user: Player;
  public userRef: FirebaseObjectObservable<any>;
  public userSubscription: Subscription;
  constructor(private af: AngularFire, private _auth: AuthService) {
    console.log("GameStateService: constructor");
    console.log("GameStateService: onInit");
    if (this._auth.authenticated) {
      this.loadUserData();
    } else {
      this._auth.subscribeLogin(() => this.loadUserData());
    }
  }

  private loadUserData(): void {
    this.userRef = this.af.database.object('users/' + this._auth.getUID());
    this.userSubscription = this.userRef.subscribe(obj => {
      this.user = obj;
      if (!obj.$exists()) {
        this.addNewUser(this._auth.getUser());
      }
    });
  }

  private addNewUser(user: firebase.User) {
    this.af.database.object('users/').update(
      {
        [user.uid]: new Player(user.uid, user.displayName, 0, user.photoURL, "Noob nugget")
      }
    );
  }

  generateNuggetsClick() {
    this.userRef.$ref.transaction(user => {
      user.nuggets++;
      return user;
    });
  }

  attack(player: Player) {
    this.af.database.object('users/' + player.id).$ref
      .transaction(user => { user.nuggets--; return user; });
  }

  help(player: Player) {
    this.af.database.object('users/' + player.id).$ref
      .transaction(user => { user.nuggets++; return user; });
  }
}
