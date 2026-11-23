import { PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import * as THREE from "three";
import { finishById, type FinishId } from "../data";
import {
  drivers,
  foldIntro,
  heroPointer,
  poseDrive,
  prefersReducedMotion,
  type Drive,
  type PoseId,
  type ScreenId,
} from "../motion/poses";
import { screenTexture } from "./screens";

const HALF_W = 0.78;
const HALF_H = 1.07;
const DEPTH = 0.07;

let studio: THREE.Texture | null = null;

function useStudio() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  useLayoutEffect(() => {
    if (!studio) {
      const pmrem = new THREE.PMREMGenerator(gl);
      studio = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      pmrem.dispose();
    }
    scene.environment = studio;
  }, [gl, scene]);
}

function approach(current: number, target: number, delta: number) {
  const lambda = prefersReducedMotion() ? 40 : 5.2;
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

function foldAngle(fold: number) {
  const open = 0.2;
  const closed = Math.PI / 2 - 0.03;
  return THREE.MathUtils.lerp(open, closed, THREE.MathUtils.clamp(fold, 0, 1));
}

function Lens({ position, radius }: { position: [number, number, number]; radius: number }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[radius, radius, 0.018, 24]} />
        <meshPhysicalMaterial color="#9a9aa0" metalness={1} roughness={0.16} />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[radius * 0.7, radius * 0.7, 0.01, 24]} />
        <meshPhysicalMaterial color="#071018" metalness={0.15} roughness={0.04} />
      </mesh>
      <mesh position={[radius * 0.28, 0.016, -radius * 0.22]}>
        <sphereGeometry args={[radius * 0.14, 12, 12]} />
        <meshBasicMaterial color="#e7eef6" />
      </mesh>
    </group>
  );
}

function Panel({ side, map }: { side: "left" | "right"; map: THREE.Texture }) {
  const shift = side === "left" ? -HALF_W / 2 : HALF_W / 2;
  return (
    <group position={[shift, 0, 0]}>
      <RoundedBox args={[HALF_W, HALF_H, DEPTH]} radius={0.03} smoothness={3} userData={{ frame: true }}>
        <meshPhysicalMaterial
          color="#1c1c1e"
          metalness={0.92}
          roughness={0.2}
          clearcoat={0.55}
          clearcoatRoughness={0.28}
        />
      </RoundedBox>
      <mesh position={[0, 0, DEPTH / 2 + 0.002]}>
        <planeGeometry args={[HALF_W - 0.055, HALF_H - 0.055]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, DEPTH / 2 + 0.006]}>
        <planeGeometry args={[HALF_W - 0.048, HALF_H - 0.048]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.07}
          roughness={0.04}
          metalness={0}
          clearcoat={1}
        />
      </mesh>
      <mesh userData={{ frame: true }} position={[0, 0, -DEPTH / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[HALF_W - 0.02, HALF_H - 0.02]} />
        <meshStandardMaterial color="#1c1c1e" metalness={0.78} roughness={0.32} />
      </mesh>
      {side === "left" ? (
        <group position={[-HALF_W / 2 - 0.004, 0.12, 0]}>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.012, 0.09, 0.02]} />
            <meshStandardMaterial color="#c7c7cc" metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[0, -0.02, 0]}>
            <boxGeometry args={[0.012, 0.14, 0.02]} />
            <meshStandardMaterial color="#c7c7cc" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      ) : (
        <mesh position={[HALF_W / 2 + 0.004, 0.08, 0]}>
          <boxGeometry args={[0.012, 0.16, 0.02]} />
          <meshStandardMaterial color="#c7c7cc" metalness={0.8} roughness={0.25} />
        </mesh>
      )}
    </group>
  );
}

export function FoldablePhone({
  pose = "open",
  finish = "grafite",
  screen = "home",
  variant = "stage",
  driver,
  introIndex,
}: {
  pose?: PoseId;
  finish?: FinishId;
  screen?: ScreenId;
  variant?: "hero" | "stage";
  driver?: "display" | "camera";
  introIndex?: number;
}) {
  useStudio();
  const root = useRef<THREE.Group>(null);
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const cam = useRef<THREE.Group>(null);
  const frame = useMemo(() => new THREE.Color(finishById(finish).frame), [finish]);
  const live = useRef({ ...poseDrive[pose] });
  const memory = screenTexture("memory");
  const home = screenTexture("home");
  const lock = screenTexture("lock");
  const leftMap = screen === "home" ? memory : lock;
  const rightMap = screen === "home" ? home : lock;

  useFrame((_, delta) => {
    const goal: Drive = driver ? { ...drivers[driver] } : { ...poseDrive[pose] };
    if (typeof introIndex === "number") {
      const settled = foldIntro[introIndex]?.t ?? 1;
      goal.yaw += (1 - settled) * (introIndex - 1) * 0.55;
      goal.lift += (1 - settled) * -0.28;
    }
    if (variant === "hero") {
      const reduce = prefersReducedMotion();
      goal.yaw += reduce ? 0 : heroPointer.x * 0.07;
      goal.tilt += (reduce ? 0 : heroPointer.y * 0.045) + drivers.hero.scrollTilt;
    }
    const current = live.current;
    current.fold = approach(current.fold, goal.fold, delta);
    current.tilt = approach(current.tilt, goal.tilt, delta);
    current.yaw = approach(current.yaw, goal.yaw, delta);
    current.roll = approach(current.roll, goal.roll, delta);
    current.lift = approach(current.lift, goal.lift, delta);
    current.scale = approach(current.scale, goal.scale, delta);
    current.cam = approach(current.cam, goal.cam, delta);
    const angle = foldAngle(current.fold);
    if (left.current) left.current.rotation.y = -angle;
    if (right.current) right.current.rotation.y = angle;
    if (root.current) {
      root.current.rotation.set(current.tilt, current.yaw, current.roll);
      root.current.position.y = current.lift;
      root.current.scale.setScalar(current.scale);
    }
    if (cam.current) {
      cam.current.position.y = THREE.MathUtils.lerp(0.18, 0.34, current.cam);
      cam.current.rotation.z = current.cam * 0.55;
      cam.current.rotation.y = current.cam * 0.35;
    }
    const blend = prefersReducedMotion() ? 1 : 0.14;
    root.current?.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.userData.frame) return;
      const material = mesh.material;
      if (!Array.isArray(material) && material && "color" in material) {
        (material as THREE.MeshStandardMaterial).color.lerp(frame, blend);
      }
    });
  });

  return (
    <>
      <PerspectiveCamera makeDefault fov={30} position={[0, 0, 2.55]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[2.4, 3.2, 4]} intensity={2.1} />
      <directionalLight position={[-2.5, 1.2, 2]} intensity={0.55} color="#e7eef8" />
      <directionalLight position={[0, -1, -3]} intensity={0.4} />
      <group ref={root}>
        <group ref={left}>
          <Panel side="left" map={leftMap} />
          <group ref={cam} position={[-HALF_W / 2, HALF_H * 0.18, -DEPTH / 2 - 0.02]}>
            <mesh>
              <boxGeometry args={[0.36, 0.42, 0.03]} />
              <meshPhysicalMaterial color="#161617" metalness={0.75} roughness={0.28} />
            </mesh>
            <Lens position={[-0.08, 0.08, -0.02]} radius={0.055} />
            <Lens position={[0.08, 0.08, -0.02]} radius={0.055} />
            <Lens position={[-0.08, -0.08, -0.02]} radius={0.042} />
            <mesh position={[0.09, -0.08, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.022, 0.022, 0.012, 16]} />
              <meshStandardMaterial color="#f4efe6" roughness={0.3} />
            </mesh>
          </group>
        </group>
        <mesh>
          <cylinderGeometry args={[0.014, 0.014, HALF_H * 0.92, 16]} />
          <meshPhysicalMaterial color="#111113" metalness={1} roughness={0.16} />
        </mesh>
        <group ref={right}>
          <Panel side="right" map={rightMap} />
          <mesh userData={{ frame: true }} position={[HALF_W / 2, 0, -DEPTH / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[HALF_W - 0.08, HALF_H - 0.08]} />
            <meshStandardMaterial color="#1c1c1e" metalness={0.7} roughness={0.35} />
          </mesh>
        </group>
      </group>
    </>
  );
}
