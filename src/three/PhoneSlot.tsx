import { lazy, Suspense, useState } from "react";
import { DuoDevice } from "../components/DuoDevice";
import type { FinishId } from "../data";
import {
  cssPose,
  nextHingePose,
  type PoseId,
  type ScreenId,
} from "../motion/poses";
import { useFinish, useGl } from "./gl";

const PhoneLive = lazy(() => import("./PhoneLive"));

type Props = {
  pose?: PoseId;
  onPoseChange?: (pose: PoseId) => void;
  finish?: FinishId;
  screen?: ScreenId;
  variant?: "hero" | "stage";
  driver?: "display" | "camera";
  introIndex?: number;
  label?: string;
};

export function PhoneSlot({
  pose = "open",
  onPoseChange,
  finish,
  screen = "home",
  variant = "stage",
  driver,
  introIndex,
  label = "iPhone Duo. Clique para abrir, fechar ou pôr em tenda.",
}: Props) {
  const gl = useGl();
  const finishState = useFinish();
  const tone = finish ?? finishState.finish;
  const [localPose, setLocalPose] = useState(pose);
  const current = onPoseChange ? pose : localPose;
  const cycle = () => {
    if (driver) return;
    const next = nextHingePose(current);
    if (onPoseChange) onPoseChange(next);
    else setLocalPose(next);
  };

  return (
    <div className="phone-slot">
      {gl.on ? (
        <Suspense fallback={null}>
          <PhoneLive
            pose={current}
            finish={tone}
            screen={screen}
            variant={variant}
            driver={driver}
            introIndex={introIndex}
          />
        </Suspense>
      ) : (
        <div className="phone-fallback">
          <DuoDevice finish={tone} screen={screen === "back" ? "back" : screen} pose={cssPose(current)} />
        </div>
      )}
      <button type="button" className="phone-hit" aria-label={label} onClick={cycle} />
    </div>
  );
}
