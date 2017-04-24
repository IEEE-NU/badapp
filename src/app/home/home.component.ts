import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

// import { ReversePipe } from '../../pipes/reverse.pipe';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
  // providers: [ReversePipe]
})
export class HomePage implements OnInit {
  user: FirebaseObjectObservable<any>;
  leaderboard: FirebaseListObservable<any>;
  id: string;
  name: string;
  constructor(public af: AngularFire, private _auth: AuthService) { }

  ngOnInit(): void {
    this.leaderboard = this.af.database.list('/users', {
      query: {
        orderByChild: 'score',
        limitToLast: 5
      }
    });
    this._auth.subscribeLogin(() => this.loadUserData());
  }

  private loadUserData(): void {
    this.id = this._auth.getUID();
    this.name = this._auth.getDisplayName();
    this.user = this.af.database.object('users/' + this.id);
    this.user.subscribe((obj) => {
      if (!obj.$exists()) {
        var allUsers = this.af.database.object('users/');
        this.addNewUser(allUsers, this.id, this.name);
      }
    });
  }

  private addNewUser(users: FirebaseObjectObservable<any>, uid: string, name: string) {
    users.set({ [this.id]: { score: 0, name: name } });
  }

  incrementScore() {
    this.user.$ref.transaction(user => {
      user.score++;
      return user;
    });
  }
}
