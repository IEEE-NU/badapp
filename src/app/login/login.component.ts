import { Component } from '@angular/core';
import { AuthService } from "../../providers/auth-service";
import { Router } from "@angular/router";

@Component({
  selector: 'page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _auth: AuthService, private _router: Router) { }

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
