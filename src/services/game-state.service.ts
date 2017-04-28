import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, AngularFire } from "angularfire2";
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "./auth.service";
import { Player, UpgradeObj } from "../classes";

@Injectable()
export class GameStateService {
  public user: Player;
  public userRef: FirebaseObjectObservable<any>;
  public userSubscription: Subscription;
  public gameParams: FirebaseObjectObservable<any>;
  public upgrades: UpgradeObj;
  public upgradesRef: FirebaseObjectObservable<UpgradeObj>;
  private userIsBot: boolean;
  constructor(private af: AngularFire, private _auth: AuthService) {
    console.log("GameStateService: constructor");
    if (this._auth.authenticated) {
      this.loadUserData();
    } else {
      this._auth.subscribeLogin(() => this.loadUserData());
    }
    this.gameParams = this.af.database.object('/game-params');
    this.upgradesRef = this.af.database.object('/upgrades');
    this.upgradesRef.subscribe(upgrades => this.upgrades = upgrades);
  }

  private loadUserData(): void {
    this.userRef = this.af.database.object('users/' + this._auth.getUID());
    this.userSubscription = this.userRef.subscribe(obj => {
      this.user = obj;
      if (!obj.$exists()) {
        this.addNewUser(this._auth.getUser());
      }
    });
    // Anti-bot measures ;)
    setTimeout(() => {
      this.userIsBot = this.isBot();
    }, 5000);
  }

  private addNewUser(user: firebase.User) {
    this.af.database.object('users/').update(
      {
        [user.uid]: new Player(user.uid, user.displayName, 0, user.photoURL, "Noob nugget")
      }
    );
  }

  generateNuggetsClick() {
    if (this.userIsBot || this.user.banned) return;
    this.userRef.$ref.transaction(user => {
      user.nuggets++;
      return user;
    });
  }

  attack(player: Player) {
    if (this.userIsBot || this.user.banned) return;
    this.af.database.object('users/' + player.id).$ref
      .transaction(user => { user.nuggets--; return user; });
  }

  help(player: Player) {
    if (this.userIsBot || this.user.banned) return;
    this.af.database.object('users/' + player.id).$ref
      .transaction(user => { user.nuggets++; return user; });
  }

  private isBot(): boolean {
    if ('$cdc_asdjflasutopfhvcZLmcfl_' in document
      || '$wdc_' in document
      || "__webdriver_script_fn" in document
      || "_Selenium_IDE_Recorder" in window
      || window.document.documentElement.getAttribute("webdriver")) {
      return true;
    } else {
      return false;
    }
  }
}
