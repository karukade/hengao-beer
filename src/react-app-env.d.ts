/// <reference types="react-scripts" />

interface HTMLVideoElement {
  playsInline: boolean;
}

type TransitionState = "entering" | "entered" | "exiting" | "exited";

type ResolvedType<T extends (arg?: any) => Promise> = ReturnType<
  T
> extends Promise<infer U>
  ? U
  : never;
