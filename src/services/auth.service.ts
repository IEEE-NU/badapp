import { Injectable } from '@angular/core';
import { AngularFireAuth, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState = undefined;

  constructor(public auth$: AngularFireAuth) {
    console.log("AuthService: constructed");
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState != null;
  }

  get hasAuthenticated(): boolean {
    return this.authState !== undefined;
  }

  subscribe(callback: (state: FirebaseAuthState) => any): any {
    return this.auth$.subscribe(callback);
  }

  subscribeLogin(callback: () => void): void {
    this.auth$.subscribe((state: FirebaseAuthState) => {
      if (state != null) {
        callback();
      }
    });
  }

  subscribeLogout(callback: () => void): void {
    this.auth$.subscribe((state: FirebaseAuthState) => {
      if (state == null) {
        callback();
      }
    });
  }

  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  signOut(): firebase.Promise<void> {
    return this.auth$.logout();
  }

  getUser(): firebase.User | null {
    if (this.authenticated) {
      return this.authState.auth;
    } else {
      return null;
    }
  }

  getUID(): string {
    if (this.authenticated) {
      return this.authState.auth.uid;
    } else {
      return '';
    }
  }

  getDisplayName(): string {
    if (this.authenticated) {
      return this.authState.auth.displayName;
    } else {
      return '';
    }
  }
}