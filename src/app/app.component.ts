import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MdIconRegistry } from "@angular/material";
import { FirebaseAuthState } from "angularfire2";

import { AuthService } from "../providers/auth-service";

@Component({
  selector: 'bad-app',
  template: `
      <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router, private _mdIconRegistry: MdIconRegistry) {
    _mdIconRegistry.setDefaultFontSetClass("game-icon");
  }

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
