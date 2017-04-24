import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../providers/auth-service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _auth: AuthService, private _router: Router) { }

    canActivate() {
        if (this._auth.authenticated) return true;

        console.log('AuthGuard: redirected to login');
        this._router.navigate(['/login']);
        return false;
    }
}
