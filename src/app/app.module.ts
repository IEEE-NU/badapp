import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { HomePage } from './home/home.component';

import {
  AngularFireModule,
  AuthMethods,
  AuthProviders
} from 'angularfire2';
import { AuthService } from '../providers/auth-service';
import 'hammerjs';

// import { ReversePipe } from '../pipes/reverse.pipe';

export const firebaseConfig = {
  apiKey: "AIzaSyA-qxU8pP8stbuuncVG4j_iSPfPvQl6GD0",
  authDomain: "badapp-aee0e.firebaseapp.com",
  databaseURL: "https://badapp-aee0e.firebaseio.com",
  projectId: "badapp-aee0e",
  storageBucket: "badapp-aee0e.appspot.com",
  messagingSenderId: "336287708104"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Redirect
};

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  declarations: [
    HomePage,
    AppComponent
    // ReversePipe
  ],
  providers: [
    AuthService
  ],
  exports: [AppComponent, MaterialModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
