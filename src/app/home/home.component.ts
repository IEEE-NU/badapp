import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subscription } from "rxjs/Subscription";

import { AuthService } from '../../providers/auth-service';
import { Player } from "../../classes";

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePage implements OnInit, OnDestroy {
  user: Player;
  userRef: FirebaseObjectObservable<any>;
  userSubscription: Subscription;
  leaderboard: FirebaseListObservable<any>;
  canAttack: boolean = true;
  constructor(public af: AngularFire, private _auth: AuthService, private _router: Router) {
    console.log("HomePage: constructor");
  }

  ngOnInit(): void {
    this.leaderboard = this.af.database.list('/users', {
      query: {
        orderByChild: 'score',
        limitToLast: 20
      }
    });
    if (this._auth.authenticated) {
      this.loadUserData();
    } else {
      this._auth.subscribeLogin(() => this.loadUserData());
    }
  }

  ngOnDestroy(): void {
    console.log("HomePage: onDestory");
    this.userSubscription.unsubscribe();
  }

  signOut(): void {
    this._auth.signOut();
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

  playerTrackBy(index: number, player: Player) {
    return player.id;
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
}
