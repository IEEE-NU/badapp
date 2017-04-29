import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { GameStateService } from "../../services/game-state.service";
import { Player, Nugget } from "../../classes";

@Component({
  selector: 'command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandComponent implements AfterViewInit {
  GRAVITY: number;
  MIN_Y_VEL: number;
  MAX_Y_VEL: number;
  MAX_X_VEL: number;
  @ViewChild('canvas') canvasRef: ElementRef;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  user: Player;
  nuggetA: HTMLImageElement = new Image();
  nuggetB: HTMLImageElement = new Image();
  nuggetC: HTMLImageElement = new Image();
  nuggetTypes: HTMLImageElement[] = [this.nuggetA, this.nuggetB, this.nuggetC];
  nuggets: Nugget[] = [];
  lastFrame: number = 0;
  constructor(public gameState: GameStateService, private cd: ChangeDetectorRef, private zone: NgZone) {
    gameState.userAsync.subscribe(u => {
      this.user = u;
      this.cd.markForCheck();
    });
    this.nuggetA.src = "assets/nugget_a.png";
    this.nuggetB.src = "assets/nugget_b.png";
    this.nuggetC.src = "assets/nugget_c.png";
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    console.log(this.canvas.offsetHeight);
    console.log(this.canvas.offsetWidth);
    this.GRAVITY = 1.23 * this.canvas.offsetHeight;
    this.MIN_Y_VEL = 0.674846625766871 * this.canvas.offsetHeight;
    this.MAX_Y_VEL = 1.10 * this.canvas.offsetHeight;
    this.MAX_X_VEL = 0.64 * this.canvas.offsetWidth;
    this.canvas.setAttribute('width', this.canvas.offsetWidth.toString());
    this.canvas.setAttribute('height', this.canvas.offsetHeight.toString());
    this.ctx = this.canvas.getContext("2d");
    this.nuggetA.onload = () => {
      this.zone.runOutsideAngular(() => {
        requestAnimationFrame(time => this.tick(time));
      });
    };
  }

  bucketClick() {
    this.gameState.generateNuggets();
    this.nuggets.push(
      new Nugget(this.getRandomIntInclusive(0, 2),
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.getRandomIntInclusive(-this.MAX_X_VEL, this.MAX_X_VEL),
        -this.getRandomIntInclusive(this.MIN_Y_VEL, this.MAX_Y_VEL)));
  }

  tick(time: number) {
    const elapsed = (time - this.lastFrame) / 1000;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let l = this.nuggets.length, i = l - 1; i >= 0; i--) {
      let nugget = this.nuggets[i];
      const nuggetType = this.nuggetTypes[nugget.type];
      nugget.x += nugget.xVelocity * elapsed;
      nugget.yVelocity += this.GRAVITY * elapsed;
      nugget.y += nugget.yVelocity * elapsed;

      if (nugget.x < 0 - nuggetType.width / 2
        || nugget.x > this.canvas.offsetWidth + nuggetType.width / 2
        || nugget.y < 0 - nuggetType.height / 2) {
        this.nuggets.splice(i, 1);
        continue;
      }

      this.ctx.drawImage(nuggetType, nugget.x - nuggetType.width / 2, nugget.y - nuggetType.height / 2);
    }

    this.lastFrame = time;
    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(time => this.tick(time));
    });
  }

  getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
