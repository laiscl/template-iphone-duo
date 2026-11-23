import * as THREE from "three";

type Kind = "memory" | "home" | "lock";

const cache = new Map<Kind, THREE.CanvasTexture>();

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function cover(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource | null,
  w: number,
  h: number,
  fallback: string,
) {
  if (!img) {
    ctx.fillStyle = fallback;
    ctx.fillRect(0, 0, w, h);
    return;
  }
  const source = img as HTMLImageElement;
  const iw = source.naturalWidth || w;
  const ih = source.naturalHeight || h;
  const scale = Math.max(w / iw, h / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}

function paint(kind: Kind, ctx: CanvasRenderingContext2D, img: HTMLImageElement | null) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);
  if (kind === "memory") {
    cover(ctx, img, w, h, "#8ea4c4");
    const fade = ctx.createLinearGradient(0, h * 0.62, 0, h);
    fade.addColorStop(0, "rgba(0,0,0,0)");
    fade.addColorStop(1, "rgba(0,0,0,0.45)");
    ctx.fillStyle = fade;
    ctx.fillRect(0, h * 0.62, w, h * 0.38);
    ctx.fillStyle = "#fff";
    ctx.font = "600 32px Inter, Helvetica, sans-serif";
    ctx.fillText("On This Day", 36, h - 72);
    ctx.font = "500 18px Inter, Helvetica, sans-serif";
    ctx.fillText("April 1, 2025", 36, h - 40);
    return;
  }
  if (kind === "lock") {
    cover(ctx, img, w, h, "#c4a574");
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "500 22px Inter, Helvetica, sans-serif";
    ctx.fillText("Tuesday, October 14", w / 2, h * 0.34);
    ctx.font = "500 92px Inter, Helvetica, sans-serif";
    ctx.fillText("9:41", w / 2, h * 0.48);
    ctx.textAlign = "left";
    return;
  }
  cover(ctx, img, w, h, "#d7c4a4");
  ctx.fillStyle = "rgba(255,255,255,0.82)";
  roundRect(ctx, 28, 36, 200, 150, 26);
  ctx.fill();
  ctx.fillStyle = "#1d1d1f";
  ctx.font = "600 18px Inter, Helvetica, sans-serif";
  ctx.fillText("San Francisco", 48, 68);
  ctx.font = "500 42px Inter, Helvetica, sans-serif";
  ctx.fillText("54°", 48, 118);
  ctx.font = "500 14px Inter, Helvetica, sans-serif";
  ctx.fillStyle = "#6e6e73";
  ctx.fillText("Partly Cloudy", 48, 148);
  const colors = ["#34c759", "#ff9f0a", "#0a84ff", "#ff375f", "#5e5ce6", "#ffd60a", "#64d2ff", "#bf5af2"];
  colors.forEach((color, index) => {
    const col = index % 4;
    const row = Math.floor(index / 4);
    const x = 36 + col * 112;
    const y = 230 + row * 112;
    ctx.fillStyle = color;
    roundRect(ctx, x, y, 92, 92, 22);
    ctx.fill();
  });
  ctx.fillStyle = "rgba(255,255,255,0.78)";
  roundRect(ctx, w / 2 - 90, h - 78, 180, 44, 22);
  ctx.fill();
}

function textureFor(kind: Kind, src: string) {
  const existing = cache.get(kind);
  if (existing) return existing;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 700;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    const empty = new THREE.CanvasTexture(canvas);
    cache.set(kind, empty);
    return empty;
  }
  paint(kind, ctx, null);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  cache.set(kind, texture);
  const image = new Image();
  image.onload = () => {
    paint(kind, ctx, image);
    texture.needsUpdate = true;
  };
  image.src = src;
  return texture;
}

export function screenTexture(kind: Kind) {
  const src = kind === "memory" ? "/memory-portrait.jpg" : "/dune-wallpaper.jpg";
  return textureFor(kind, src);
}
