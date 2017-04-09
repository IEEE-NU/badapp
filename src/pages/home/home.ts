import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  score: number = 0;
  authenticated: boolean = false;
  constructor(public navCtrl: NavController, af: AngularFire, private _auth: AuthService) {

  }
  signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    this.authenticated = true;
    console.log("Facebook display name ",this._auth.displayName());
  }
}
