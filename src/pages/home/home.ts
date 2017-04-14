import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

// import { ReversePipe } from '../../pipes/reverse.pipe';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  // providers: [ReversePipe]
})
export class HomePage {
  user: FirebaseObjectObservable<any>;
  leaderboard: FirebaseListObservable<any>;
  id: string;
  name: string;
  authenticated: boolean = false;
  constructor(public navCtrl: NavController, public af: AngularFire, private _auth: AuthService) {
    this.leaderboard = af.database.list('/users', {
      query: {
        orderByChild: 'score',
        limitToLast: 5
      }
    });
  }

  signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    this.authenticated = true;
    this.id = this._auth.getUID();
    this.name = this._auth.getDisplayName();
    this.user = this.af.database.object('users/' + this.id);
    this.user.subscribe((obj) => {
      if (!obj.$exists()) {
        var allUsers = this.af.database.object('users/');
        this.addNewUser(allUsers, this.id, this.name);
      }
    });
  }

  private addNewUser(users, uid, name) {
    users.set({ [this.id]: { score: 0, name: name } });
  }

  incrementScore() {
    this.user.$ref.transaction(user => {
      user.score++;
      return user;
    });
  }
}
