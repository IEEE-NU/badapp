import { Injectable } from '@angular/core';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';
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
    return this.authState !== null;
  }

  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login();
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