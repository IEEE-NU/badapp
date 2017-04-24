import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../providers/auth-service";
import { Router } from "@angular/router";
import { FirebaseAuthState } from "angularfire2";

@Component({
  selector: 'page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
    this._auth.subscribe((state: FirebaseAuthState) => {
      if (state != null) {
        this.onSignInSuccess();
      }
    });
  }

  signInWithFacebook(): void {
    this._auth.signInWithFacebook().then(this.onSignInSuccess);
  }

  signInWithGoogle(): void {
    this._auth.signInWithGoogle().then(this.onSignInSuccess);
  }

  private onSignInSuccess(): void {
    this._router.navigate(['/home']);
  }
}
