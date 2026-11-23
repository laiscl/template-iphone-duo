import type { FinishId } from "../data";

export type PoseId =
  | "open"
  | "landscape"
  | "portrait"
  | "closed"
  | "tent"
  | "seated"
  | "standing"
  | "durability";

export type Drive = {
  fold: number;
  tilt: number;
  yaw: number;
  roll: number;
  lift: number;
  scale: number;
  cam: number;
};

export const poseDrive: Record<PoseId, Drive> = {
  open: { fold: 0.1, tilt: -0.2, yaw: 0.05, roll: 0, lift: 0, scale: 1, cam: 0 },
  landscape: { fold: 0.08, tilt: -0.26, yaw: 0, roll: 0, lift: 0, scale: 1, cam: 0 },
  portrait: { fold: 0.14, tilt: -0.06, yaw: 0.12, roll: Math.PI / 2, lift: 0, scale: 0.9, cam: 0 },
  closed: { fold: 1, tilt: -0.2, yaw: -1.2, roll: 0, lift: 0, scale: 0.92, cam: 0.15 },
  tent: { fold: 0.58, tilt: 0.48, yaw: 0.2, roll: 0, lift: -0.04, scale: 1, cam: 0 },
  seated: { fold: 0.5, tilt: 0.55, yaw: 0.28, roll: 0, lift: -0.06, scale: 1, cam: 0 },
  standing: { fold: 0.32, tilt: -0.02, yaw: 0.62, roll: 0, lift: 0, scale: 1, cam: 0 },
  durability: { fold: 0.74, tilt: -0.1, yaw: -0.5, roll: 0.18, lift: 0, scale: 1, cam: 0 },
};

export const drivers = {
  hero: { scrollTilt: 0 },
  display: { fold: 0.8, tilt: -0.5, yaw: 0.02, roll: 0, lift: -0.22, scale: 0.72, cam: 0 },
  camera: { fold: 1, tilt: -0.22, yaw: -0.7, roll: 0, lift: 0, scale: 0.82, cam: 0 },
};

export const foldIntro = [{ t: 0 }, { t: 0 }, { t: 0 }];

export const heroPointer = { x: 0, y: 0 };

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function nextHingePose(current: PoseId): PoseId {
  const order: PoseId[] = ["open", "closed", "tent"];
  const index = order.indexOf(current);
  return order[(index + 1) % order.length] ?? "closed";
}

export function cssPose(pose: PoseId): "open" | "tent" | "closed" {
  if (pose === "closed") return "closed";
  if (pose === "tent" || pose === "seated") return "tent";
  return "open";
}

export type ScreenId = "home" | "lock" | "back";

export const defaultFinish: FinishId = "grafite";
