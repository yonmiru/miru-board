import { useEffect } from "react";

const PI2 = Math.PI * 2;

const random = (min: number, max: number): number => Math.random() * (max - min + 1) + min | 0;
const timestamp = (): number => new Date().getTime();

// Container
class Birthday {
  fireworks: Firework[] = [];
  counter: number = 0;
  width: number = 0;
  height: number = 0;
  spawnA: number = 0;
  spawnB: number = 0;
  spawnC: number = 0;
  spawnD: number = 0;

  constructor() {
    this.resize();
  }

  resize(): void {
    if (!canvas) return;
    this.width = canvas.width = window.innerWidth;
    this.height = canvas.height = window.innerHeight;
    let center = this.width / 2 | 0;
    this.spawnA = center - center / 4 | 0;
    this.spawnB = center + center / 4 | 0;
    this.spawnC = this.height * 0.1;
    this.spawnD = this.height * 0.5;
  }

  onClick(evt: MouseEvent | TouchEvent): void {
    const x = (evt as MouseEvent).clientX || ((evt as TouchEvent).touches && (evt as TouchEvent).touches[0].pageX);
    const y = (evt as MouseEvent).clientY || ((evt as TouchEvent).touches && (evt as TouchEvent).touches[0].pageY) + window.scrollY;

    const count = random(3, 5);
    for (let i = 0; i < count; i++) {
      this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height + window.scrollY,
        x,
        y,
        random(0, 260),
        random(30, 110)
      ));
    }
    this.counter = -1;
  }

  update(delta: number): void {
    if (!ctx) return;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'oklch(0.145 0 0)';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.globalCompositeOperation = 'lighter';
    for (let firework of this.fireworks) firework.update(delta);

    this.counter += delta * 3;
    if (this.counter >= 1) {
      this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height + window.scrollY,
        random(0, this.width),
        random(this.spawnC, this.spawnD),
        random(0, 360),
        random(30, 110)
      ));
      this.counter = 0;
    }

    if (this.fireworks.length > 1000) {
      this.fireworks = this.fireworks.filter(firework => !firework.dead);
    }
  }
}

class Firework {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  shade: number;
  offsprings: number;
  dead: boolean = false;
  history: { x: number; y: number }[] = [];
  madeChilds?: boolean;

  constructor(x: number, y: number, targetX: number, targetY: number, shade: number, offsprings: number) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.shade = shade;
    this.offsprings = offsprings;
  }

  update(delta: number): void {
    if (this.dead) return;

    const xDiff = this.targetX - this.x;
    const yDiff = this.targetY - this.y;

    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
      this.x += xDiff * 2 * delta;
      this.y += yDiff * 2 * delta;
      this.history.push({ x: this.x, y: this.y });

      if (this.history.length > 20) this.history.shift();
    } else {
      if (this.offsprings && !this.madeChilds) {
        let babies = this.offsprings / 2;
        for (let i = 0; i < babies; i++) {
          let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0;
          let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0;
          birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0));
        }
      }
      this.madeChilds = true;
      this.history.shift();
    }

    if (this.history.length === 0) this.dead = true;
    else if (this.offsprings) {
      for (let i = 0; this.history.length > i; i++) {
        let point = this.history[i];
        ctx.beginPath();
        ctx.fillStyle = `hsl(${this.shade},100%,${i}%)`;
        ctx.arc(point.x, point.y, 1, 0, PI2, false);
        ctx.fill();
      }
    } else {
      ctx.beginPath();
      ctx.fillStyle = `hsl(${this.shade},100%,50%)`;
      ctx.arc(this.x, this.y, 1, 0, PI2, false);
      ctx.fill();
    }
  }
}

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let then: number;
let birthday: Birthday;

export default function Canvas() {
  useEffect(() => {
    canvas = document.getElementById('birthday') as HTMLCanvasElement;
    ctx = canvas.getContext('2d')!;
    then = timestamp();
    birthday = new Birthday();

    window.onresize = () => birthday.resize();
    document.onclick = evt => birthday.onClick(evt);
    document.ontouchstart = evt => birthday.onClick(evt as TouchEvent);

    const loop = () => {
      requestAnimationFrame(loop);
      let now = timestamp();
      let delta = (now - then) / 1000;
      then = now;
      birthday.update(delta);
    };

    loop();

    // Cleanup function to remove event listeners
    return () => {
      window.onresize = null;
      document.onclick = null;
      document.ontouchstart = null;
    };
  }, []);

  return (<canvas id="birthday" className="fixed inset-0 -z-10 w-full h-full" />);
}
