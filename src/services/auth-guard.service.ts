import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "./auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _auth: AuthService, private _router: Router) { }

    canActivate(): Observable<boolean> | boolean {
        if (!this._auth.hasAuthenticated) {
            // Not sure if logged in or not, wait till we know then decide
            return this._auth.getObservable().first().map(() => {
                return this.canActivate();
            });
        }

        if (this._auth.authenticated) {
            return true;
        } else {
            console.log('AuthGuard: redirected to login');
            this._router.navigate(['/login']);
            return false;
        }
    }
}
