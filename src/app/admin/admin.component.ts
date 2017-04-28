import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { GameStateService } from "../../services/game-state.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  @ViewChildren('upgradeText') upgradeTexts: QueryList<ElementRef>;
  constructor(public gameState: GameStateService, private _router: Router) {
    gameState.userRef.subscribe(user => {
      if (!user.admin) {
        this._router.navigate(['/home']);
      }
    });
  }

  gameParamChange(event: Event) {
    let element = <HTMLInputElement>event.srcElement;
    this.gameState.gameParams.$ref.set(JSON.parse(element.value));
  }

  upgradeChange() {
    let newUpgrades: any = {};
    this.upgradeTexts.forEach(el => {
      let upgrades = JSON.parse(el.nativeElement.value);
      for (var i = 0, l = upgrades.length; i < l; i++) {
        newUpgrades[upgrades[i].id] = upgrades[i];
      }
    });
    this.gameState.upgradesRef.set(newUpgrades);
  }
}
