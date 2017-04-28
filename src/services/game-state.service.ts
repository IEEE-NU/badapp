import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, AngularFire } from "angularfire2";
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "./auth.service";
import { Player, Upgrade } from "../classes";

@Injectable()
export class GameStateService {
  private gameVersion = 1;
  public user: Player;
  public userRef: FirebaseObjectObservable<Player>;
  public userSubscription: Subscription;
  public gameParams: FirebaseObjectObservable<any>;
  public upgrades: Upgrade[] = [];
  public upgradesRef: FirebaseObjectObservable<any>;
  attackTimeout: number;
  healTimeout: number;
  constructor(private af: AngularFire, private _auth: AuthService) {
    console.log("GameStateService: constructor");
    if (this._auth.authenticated) {
      this.loadUserData();
    } else {
      this._auth.subscribeLogin(() => this.loadUserData());
    }
    this.gameParams = this.af.database.object('/game-params');
    this.gameParams.subscribe(params => {
      if (params.gameVersion > this.gameVersion) {
        location.reload();
      }
    });
    this.upgradesRef = this.af.database.object('/upgrades');
    this.upgradesRef.subscribe(upgrades => {
      for (let key in upgrades) {
        this.upgrades.push(this.cast<Upgrade>(upgrades[key], Upgrade));
      }
    });
  }

  private loadUserData(): void {
    this.userRef = this.af.database.object('users/' + this._auth.getUID());
    this.userSubscription = this.userRef.subscribe(obj => {
      if (!obj.$exists()) {
        this.addNewUser(this._auth.getUser());
        return;
      }
      this.user = this.cast<Player>(obj, Player);
      if (this.user.super_banned) {
        this._auth.signOut();
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
    if (this.isBot || this.user.banned) return;
    this.userRef.$ref.transaction(user => {
      user.nuggets++;
      return user;
    });
  }

  attack(player: Player) {
    if (this.isBot || this.user.banned) return;
    this.af.database.object('users/' + player.id).$ref
      .transaction(user => { user.nuggets--; return user; });
    this.userRef.$ref.update({ attacking: player.id });
    clearTimeout(this.attackTimeout);
    this.attackTimeout = setTimeout(() => this.userRef.$ref.update({ attacking: '' }), 500);
  }

  help(player: Player) {
    if (this.isBot || this.user.banned) return;
    this.af.database.object('users/' + player.id).$ref
      .transaction(user => { user.nuggets++; return user; });
    this.userRef.$ref.update({ helping: player.id });
    clearTimeout(this.healTimeout);
    this.healTimeout = setTimeout(() => this.userRef.$ref.update({ helping: '' }), 500);
  }

  buyUpgrade(upgrade: Upgrade): void {
    console.log("Buying upgrade " + upgrade.name);
    if (this.user.nuggets < upgrade.cost(this.user)) return;
    this.userRef.$ref.transaction(user => {
      user = this.cast<Player>(user, Player);
      user.addUpgrade(upgrade);
      return user;
    });
  }

  private get isBot(): boolean {
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

  cast<T>(obj: any, cl: any): T {
    obj.__proto__ = cl.prototype;
    return obj;
  }
}
