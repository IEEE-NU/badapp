import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subscription } from "rxjs/Subscription";

import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePage implements OnInit, OnDestroy {
  user: FirebaseObjectObservable<any>;
  userSubscription: Subscription;
  leaderboard: FirebaseListObservable<any>;
  id: string;
  name: string;
  constructor(public af: AngularFire, private _auth: AuthService, private _router: Router) {
    console.log("HomePage: constructor");
  }

  ngOnInit(): void {
    this.leaderboard = this.af.database.list('/users', {
      query: {
        orderByChild: 'score',
        limitToLast: 5
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
    this.id = this._auth.getUID();
    this.name = this._auth.getDisplayName();
    this.user = this.af.database.object('users/' + this.id);
    this.userSubscription = this.user.subscribe((obj) => {
      if (!obj.$exists()) {
        this.addNewUser(this.id, this.name);
      }
    });
  }

  private addNewUser(uid: string, name: string) {
    this.af.database.object('users/').update({ [this.id]: { score: 0, name: name } });
  }

  incrementScore() {
    this.user.$ref.transaction(user => {
      user.score++;
      return user;
    });
  }
}
