import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../providers/auth-service";
import { FirebaseAuthState } from "angularfire2";

@Component({
  selector: 'bad-app',
  template: `
      <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this._auth.subscribe((state: FirebaseAuthState) => {
      if (state != null) {
        console.log("AppComponent: redirecting to home");
        this._router.navigate(['/home']);
      } else {
        console.log("AppComponent: redirecting to login");
        this._router.navigate(['/login']);
      }
    });
  }
}
