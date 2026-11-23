import { View } from "@react-three/drei";
import type { FinishId } from "../data";
import type { PoseId, ScreenId } from "../motion/poses";
import { FoldablePhone } from "./FoldablePhone";

export default function PhoneLive({
  pose,
  finish,
  screen,
  variant,
  driver,
  introIndex,
}: {
  pose: PoseId;
  finish: FinishId;
  screen: ScreenId;
  variant: "hero" | "stage";
  driver?: "display" | "camera";
  introIndex?: number;
}) {
  return (
    <View className="phone-view">
      <FoldablePhone
        pose={pose}
        finish={finish}
        screen={screen}
        variant={variant}
        driver={driver}
        introIndex={introIndex}
      />
    </View>
  );
}
