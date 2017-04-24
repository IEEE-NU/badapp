import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'bad-app',
  template: `
      <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {
  constructor(private _router: Router) { }

  ngOnInit(): void {
    this._router.navigate(['/']);
  }
}
