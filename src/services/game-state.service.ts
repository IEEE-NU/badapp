import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, AngularFire } from "angularfire2";
import { Observable } from "rxjs/Observable";
import { MdSnackBar } from "@angular/material";

import { AuthService } from "./auth.service";
import { Player, Upgrade } from "../classes";

@Injectable()
export class GameStateService {
  private gameVersion = 4;
  public user: Player;
  public userRef: FirebaseObjectObservable<Player>;
  public userAsync: Observable<Player>;
  public gameParams: any;
  public gameParamsRef: FirebaseObjectObservable<any>;
  public upgrades: Upgrade[] = [];
  public upgradesRef: FirebaseObjectObservable<any>;
  public upgradesAsync: Observable<Upgrade[]>;
  attackTimeout: number;
  healTimeout: number;
  constructor(private af: AngularFire, private _auth: AuthService, private snackbar: MdSnackBar) {
    console.log("GameStateService: constructor");
    if (this._auth.authenticated) {
      this.loadUserData();
    } else {
      this._auth.subscribeLogin(() => this.loadUserData());
    }
    this.gameParamsRef = this.af.database.object('/game-params');
    this.gameParamsRef.subscribe(params => {
      this.gameParams = params;
      if (params.gameVersion > this.gameVersion) {
        location.reload();
      }
    });
    this.upgradesRef = this.af.database.object('/upgrades');
    this.upgradesAsync = this.af.database.object('/upgrades').map(upgrades => {
      this.upgrades = [];
      for (let key in upgrades) {
        this.upgrades.push(this.cast<Upgrade>(upgrades[key], Upgrade));
      }
      return this.upgrades;
    });
  }

  private loadUserData(): void {
    this.userRef = this.af.database.object('users/' + this._auth.getUID());
    this.userAsync = this.userRef.map(u => this.cast<Player>(u, Player));
    this.userAsync.subscribe(u => {
      if (!u.$exists()) {
        this.addNewUser(this._auth.getUser());
        return;
      }
      this.user = u;
      if (this.user.superBanned) {
        this._auth.signOut();
      }
    });
  }

  private addNewUser(user: firebase.User) {
    this.af.database.object('users/').update(
      {
        [user.uid]: new Player(user.uid, user.displayName, user.photoURL)
      }
    );
  }

  changeSelfNuggets(n: number): void {
    if (!n) return;
    this.userRef.$ref.transaction(user => {
      user = this.cast<Player>(user, Player);
      user.changeNuggets(n);
      return user;
    });
  }

  changeOtherNuggets(player: Player, n: number): void {
    if (!n) return;
    this.af.database.object('users/' + player.id).$ref.transaction(user => {
      user = this.cast<Player>(user, Player);
      user.changeNuggets(n);
      return user;
    });
  }

  generateNuggets() {
    if (!this.canDoStuff) return;
    this.changeSelfNuggets(this.user.nuggetsPerClick);
  }

  attack(player: Player): boolean {
    if (!this.canDoStuff) return;
    let attack = this.user.damagePerClick;
    let defense = Math.round(player.abs_defense + attack * player.rel_defense);
    let damage = attack - defense;
    if (damage < 0) {
      this.snackbar.open("No damage done!", "OK", { duration: 2000 });
      return false;
    }
    this.snackbar.open(`Dealt ${damage} damage`, "OK", { duration: 2000 });
    this.changeOtherNuggets(player, -damage);
    this.changeSelfNuggets(Math.round(damage * this.user.steal));

    this.userRef.$ref.update({ attacking: player.id });
    clearTimeout(this.attackTimeout);
    this.attackTimeout = setTimeout(() => this.userRef.$ref.update({ attacking: '' }), 500);
    return true;
  }

  help(player: Player) {
    if (!this.canDoStuff) return;
    this.changeOtherNuggets(player, this.user.helpPerClick);
    this.changeSelfNuggets(this.user.selfHelpPerClick);

    this.userRef.$ref.update({ helping: player.id });
    clearTimeout(this.healTimeout);
    this.healTimeout = setTimeout(() => this.userRef.$ref.update({ helping: '' }), 500);
  }

  buyUpgrade(upgrade: Upgrade): void {
    if (!this.canDoStuff) return;
    console.log("Buying upgrade " + upgrade.name);
    if (!this.user.canBuy(upgrade)) return;
    this.userRef.$ref.transaction(user => {
      user = this.cast<Player>(user, Player);
      user.addUpgrade(upgrade);
      user.calculateStats(this.upgrades);
      return user;
    });
  }

  private get canDoStuff(): boolean {
    return this.gameParams.isRunning && !this.isBot && !this.user.banned && !this.user.superBanned;
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

  public cast<T>(obj: any, cl: any): T {
    obj.__proto__ = cl.prototype;
    return obj;
  }
}
