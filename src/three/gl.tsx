import { createContext, useContext } from "react";
import type { FinishId } from "../data";
import { defaultFinish } from "../motion/poses";

type GlValue = { on: boolean; setOn: (on: boolean) => void };
type FinishValue = { finish: FinishId; setFinish: (finish: FinishId) => void };

export const GlContext = createContext<GlValue>({ on: false, setOn: () => undefined });
export const FinishContext = createContext<FinishValue>({
  finish: defaultFinish,
  setFinish: () => undefined,
});

export function useGl() {
  return useContext(GlContext);
}

export function useFinish() {
  return useContext(FinishContext);
}
