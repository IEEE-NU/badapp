import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MdIconRegistry } from "@angular/material";
import { FirebaseAuthState } from "angularfire2";

import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'bad-app',
  template: `
      <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {
  routeSub: Subscription;
  constructor(private _auth: AuthService, private _router: Router, private _route: ActivatedRoute, private _mdIconRegistry: MdIconRegistry) {
    _mdIconRegistry.setDefaultFontSetClass("game-icon");
  }

  ngOnInit(): void {
    this._auth.subscribe((state: FirebaseAuthState) => {
      if (state != null) {
        this.routeSub = this._route.url.subscribe(o => {
          console.log(o);
          // console.log("AppComponent: redirecting to home");
          // this._router.navigate(['/home']);
          // this.routeSub.unsubscribe();
        });
      } else {
        console.log("AppComponent: redirecting to login");
        this._router.navigate(['/login']);
      }
    });
  }
}
