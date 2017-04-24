import { Injectable } from '@angular/core';
import { AngularFireAuth, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;

  constructor(public auth$: AngularFireAuth) {
    console.log("AuthService: constructed");
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState != null;
  }

  subscribe(callback: (state: FirebaseAuthState) => void): void {
    this.auth$.subscribe(callback);
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