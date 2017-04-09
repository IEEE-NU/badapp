import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  score: number = 0;
  constructor(public navCtrl: NavController, af: AngularFire) {

  }
}
