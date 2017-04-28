import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MdIconRegistry } from "@angular/material";
import { AngularFireModule } from 'angularfire2';

import { UiModule } from './ui/ui.module';

import { AppComponent } from './app.component';
import { HomePage } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

import { AuthGuard } from "../services/auth-guard.service";
import { AuthService } from "../services/auth.service";
import { CommandComponent } from './command/command.component';
import { UpgradeTabComponent } from "./upgrade-tab/upgrade-tab.component";
import { AdminComponent } from './admin/admin.component';

export const firebaseConfig = {
  apiKey: "AIzaSyA-qxU8pP8stbuuncVG4j_iSPfPvQl6GD0",
  authDomain: "badapp-aee0e.firebaseapp.com",
  databaseURL: "https://badapp-aee0e.firebaseio.com",
  projectId: "badapp-aee0e",
  storageBucket: "badapp-aee0e.appspot.com",
  messagingSenderId: "336287708104"
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomePage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'command',
        pathMatch: 'full'
      },
      {
        path: 'command',
        component: CommandComponent
      },
      {
        path: 'upgrade',
        component: UpgradeTabComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    UiModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes)
  ],
  declarations: [
    HomePage,
    AppComponent,
    LoginComponent,
    PlayerCardComponent,
    LeaderboardComponent,
    CommandComponent,
    UpgradeTabComponent,
    AdminComponent
  ],
  providers: [
    AuthService, AuthGuard, MdIconRegistry
  ],
  exports: [AppComponent, UiModule, RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
