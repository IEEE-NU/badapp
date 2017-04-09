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
  signInWithGoogle(): void {
    this._auth.signInWithGoogle()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    this.authenticated = true;
    console.log("Google display name ",this._auth.displayName());
  }
}
