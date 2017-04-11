import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myScore: FirebaseObjectObservable<any>;
  id: string;
  name: string;
  authenticated: boolean = false;
  scores;
  constructor(public navCtrl: NavController, public af: AngularFire, private _auth: AuthService) {
  }

  signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    this.authenticated = true;
    this.id = this._auth.getUID();
    this.name = this._auth.getDisplayName();
    this.myScore = this.af.database.object('scores/' + this.id);
    this.myScore.subscribe((obj) => {
      if (!obj.$exists()) {
        this.addNewUser(this.myScore, this.id, this.name);
      }
    });
  }

  private addNewUser(scoreObj, uid, name) {
    scoreObj.set({ [this.id]: 0});
    this.af.database.object('users/' + this.id).set({ name: this.name});
  }

  incrementScore() {
    this.myScore.$ref.transaction(score => {
      return score + 1;
    });
  }
}
