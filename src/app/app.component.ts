import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { MdIconRegistry } from "@angular/material";

import { AuthService } from "../services/auth.service";

@Component({
  selector: 'bad-app',
  template: `
      <router-outlet></router-outlet>
    `
})
export class AppComponent {
  constructor(private _auth: AuthService, private _router: Router, private _mdIconRegistry: MdIconRegistry) {
    _mdIconRegistry.setDefaultFontSetClass("game-icon");
  }
}
