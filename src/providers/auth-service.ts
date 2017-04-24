import { Injectable } from '@angular/core';
import { AngularFireAuth, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;

  constructor(public auth$: AngularFireAuth) {
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
      method: AuthMethods.Redirect
    });
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    });
  }

  signOut(): void {
    this.auth$.logout();
  }

  getUID(): string {
    if (this.authenticated) {
      return this.authState.facebook.uid;
    } else {
      return '';
    }
  }

  getDisplayName(): string {
    if (this.authenticated) {
      return this.authState.facebook.displayName;
    } else {
      return '';
    }
  }
}