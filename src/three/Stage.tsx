import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { useGl } from "./gl";

export default function Stage() {
  const { setOn } = useGl();
  const mobile = window.matchMedia("(max-width: 860px)").matches;
  return (
    <Canvas
      className="gl-stage"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 4 }}
      dpr={mobile ? 1 : [1, 1.35]}
      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        setOn(true);
      }}
    >
      <View.Port />
    </Canvas>
  );
}
