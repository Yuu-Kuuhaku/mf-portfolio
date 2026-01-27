import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Vec2 {
  x: number;
  y: number;
}

interface Leg {
  anchorIndex: number;
  side: -1 | 1;
  foot: Vec2;
  phase: number;
  group: 0 | 1; // grupo de caminhada
}

@Component({
  selector: 'app-lizard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lizard.html',
  styleUrl: './lizard.scss',
})
export class Lizard implements AfterViewInit {

  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  /* =======================
   * Estrutura base
   * ======================= */
  private readonly spineCount = 22;
  private readonly segment = 11;

  private spine: Vec2[] = [];
  private angles: number[] = [];

  /* =======================
   * Movimento
   * ======================= */
  private target: Vec2 = { x: 0, y: 0 };
  isMoving = false;
  private walkPhase = 0;


  /* =======================
   * Patas
   * ======================= */
  legs: Leg[] = [];
  private lastHead: Vec2 = { x: 0, y: 0 };
  private headSpeed = 0;

  /* =======================
   * Olhos / Língua
   * ======================= */
  isBlinking = false;
  private blinkTimer = 0;
  private nextBlink = 120;

  tongueOut = false;
  private tongueTimer = 0;
  tongueProgress = 0;

  /* =======================
   * Lifecycle
   * ======================= */
  ngAfterViewInit() {
    this.initCanvas();
    this.initLizard();
    this.loop();
  }

  /* =======================
   * Init
   * ======================= */
  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D indisponível');

    this.ctx = ctx;
    this.resize();
  }

  private initLizard() {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    this.spine = Array.from({ length: this.spineCount }, (_, i) => ({
      x: cx - i * this.segment,
      y: cy,
    }));

    this.angles = new Array(this.spineCount).fill(0);
    this.target = { x: cx, y: cy };

    this.legs = [
      { anchorIndex: 5, side: -1, foot: { x: 0, y: 0 }, phase: Math.PI, group: 0 },
      { anchorIndex: 5, side: 1, foot: { x: 0, y: 0 }, phase: 0, group: 1 },
      { anchorIndex: 13, side: -1, foot: { x: 0, y: 0 }, phase: 0, group: 0 },
      { anchorIndex: 13, side: 1, foot: { x: 0, y: 0 }, phase: Math.PI, group: 1 },
    ];

    for (const leg of this.legs) {
      const p = this.spine[leg.anchorIndex];
      const bodySize = this.bodyRadius(leg.anchorIndex);
      leg.foot = {
        x: p.x + leg.side * bodySize * 2,
        y: p.y + bodySize * 2.5,
      };
    }
  }

  /* =======================
   * Eventos
   * ======================= */
  @HostListener('window:resize')
  resize() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.target = { x: e.clientX, y: e.clientY  };
  }

  /* =======================
   * Update
   * ======================= */
  private update() {

    if (this.headSpeed > 0.3) {
      this.walkPhase += 0.08;
    } else {
      this.walkPhase = 0;
    }

    this.updateMovement();
    this.updateSpine();
    this.updateLegs();
    this.updateBlink();
    this.updateTongue();
  }

  private updateMovement() {
    const head = this.spine[0];

    this.headSpeed = Math.hypot(head.x - this.lastHead.x, head.y - this.lastHead.y);

    this.lastHead.x = head.x;
    this.lastHead.y = head.y;
    const dx = this.target.x - head.x;
    const dy = this.target.y - head.y;
    const dist = Math.hypot(dx, dy);

    this.isMoving = dist > this.segment * 7;
    if (!this.isMoving) return;

    const t = Math.min(dist / (this.segment * 28), 1);
    const speed = 0.2 + (6 - 0.2) * (t * t);
    const angle = Math.atan2(dy, dx);

    head.x += Math.cos(angle) * speed;
    head.y += Math.sin(angle) * speed;
  }

  private updateSpine() {
    for (let i = 1; i < this.spine.length; i++) {
      const prev = this.spine[i - 1];
      const cur = this.spine[i];
      const a = Math.atan2(prev.y - cur.y, prev.x - cur.x);

      cur.x = prev.x - Math.cos(a) * this.segment;
      cur.y = prev.y - Math.sin(a) * this.segment;
      this.angles[i] = a;
    }
  }

 private updateLegs() {
  const moving = this.headSpeed > 0.3;
  const activeGroup = Math.floor(this.walkPhase / Math.PI) % 2;

  for (const leg of this.legs) {
    const anchor = this.spine[leg.anchorIndex];
    const isRear = leg.anchorIndex > this.spine.length * 0.5;
    const body = this.bodyRadius(leg.anchorIndex);

    const side = leg.side * body * 1.8;
    const lift = isRear ? body * 0.6 : body;

    const desired = {
      x:
        anchor.x +
        Math.cos(this.angles[leg.anchorIndex])  +
        side,
      y:
        anchor.y +
        Math.sin(this.angles[leg.anchorIndex])+
        body * 2.2,
    };

    // 👉 só o grupo ativo pode levantar a pata
    if (moving && leg.group !== activeGroup) {
      if (leg.phase >= Math.PI) leg.phase = 0;
    }

    if (leg.phase < Math.PI) {
      leg.phase += 0.12;

      leg.foot.x += (desired.x - leg.foot.x) * 0.45;
      leg.foot.y =
        desired.y - Math.sin(leg.phase) * lift;
    } else {
      // pata apoiada no chão
      leg.foot.x += (desired.x - leg.foot.x) * 0.1;
      leg.foot.y += (desired.y - leg.foot.y) * 0.1;
    }
  }
}


  /* =======================
   * Draw
   * ======================= */
  private draw() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.legs.forEach((l) => this.drawLeg(l));
    this.drawBody();
    this.drawHead();
  }

  private drawLeg(leg: Leg) {
    const anchor = this.spine[leg.anchorIndex];
    const kneeY = (anchor.y + leg.foot.y) / 2 - this.bodyRadius(leg.anchorIndex);

    this.ctx.strokeStyle = '#5e8f6d';
    this.ctx.lineWidth = this.bodyRadius(leg.anchorIndex) * 0.6;

    this.ctx.beginPath();
    this.ctx.moveTo(anchor.x, anchor.y);
    this.ctx.lineTo((anchor.x + leg.foot.x) / 2, kneeY);
    this.ctx.lineTo(leg.foot.x, leg.foot.y);
    this.ctx.stroke();
  }

  private drawBody() {
    for (let i = this.spine.length - 1; i >= 0; i--) {
      const p = this.spine[i];
      const r = this.bodyRadius(i);

      this.ctx.fillStyle = '#8bcf9e';
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawHead() {
    const head = this.spine[0];
    const angle = this.angles[1] ?? 0;
    const r = this.bodyRadius(0);

    this.ctx.save();
    this.ctx.translate(head.x, head.y);
    this.ctx.rotate(angle);

    this.ctx.fillStyle = '#7fbf90';
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, r * 1.6, r * 1.2, 0, 0, Math.PI * 2);
    this.ctx.fill();

    if (this.tongueProgress > 0) {
      const len = r * 1.8 * this.tongueProgress;
      this.ctx.strokeStyle = '#e06666';
      this.ctx.lineWidth = r * 0.2;
      this.ctx.lineCap = 'round';

      this.ctx.beginPath();
      this.ctx.moveTo(r * 1.6, 0);
      this.ctx.lineTo(r * 1.6 + len, -2);
      this.ctx.moveTo(r * 1.6, 0);
      this.ctx.lineTo(r * 1.6 + len, 2);
      this.ctx.stroke();
    }

    this.ctx.fillStyle = '#1b1b1b';
    if (this.isBlinking) {
      this.ctx.lineWidth = 2;
      [-1, 1].forEach((s) => {
        this.ctx.beginPath();
        this.ctx.moveTo(r * 0.4, s * r * 0.4);
        this.ctx.lineTo(r * 0.7, s * r * 0.4);
        this.ctx.stroke();
      });
    } else {
      [-1, 1].forEach((s) => {
        this.ctx.beginPath();
        this.ctx.arc(r * 0.6, s * r * 0.4, r * 0.2, 0, Math.PI * 2);
        this.ctx.fill();
      });
    }

    this.ctx.restore();
  }

  /* =======================
   * Helpers
   * ======================= */
  private bodyRadius(i: number) {
    const t = i / this.spine.length;
    return 14 * (1 - t) + 4;
  }

  private updateBlink() {
    if (this.isBlinking) {
      if (--this.blinkTimer <= 0) {
        this.isBlinking = false;
        this.nextBlink = Math.random() * 120 + 80;
      }
    } else if (--this.nextBlink <= 0) {
      this.isBlinking = true;
      this.blinkTimer = 10;
    }
  }

  private updateTongue() {
    if (this.tongueOut) {
      this.tongueTimer--;
      const half = 10;

      this.tongueProgress += this.tongueTimer > half ? 0.15 : -0.15;
      this.tongueProgress = Math.max(0, Math.min(1, this.tongueProgress));

      if (this.tongueTimer <= 0) {
        this.tongueOut = false;
        this.tongueProgress = 0;
      }
    } else if (Math.random() < (this.isMoving ? 0.008 : 0.01)) {
      this.tongueOut = true;
      this.tongueTimer = 20;
    }
  }

  /* =======================
   * Loop
   * ======================= */
  private readonly loop = () => {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  };
}
