import actionCreatorFactory from "typescript-fsa";
import { thunkPrepareFaceApi } from "./faceApi";
import { thunkPrepareVideo } from "./video";

import { AppThunk } from "../reducers";

export const appState = {
  WAIT_START: "WAIT_START",
  START_APP: "START_APP",
  INITIALIZING_APP: "INITIALIZING_APP",
  WAIT_MAGAO: "WAIT_MAGAO",
  TAKING_MAGAO: "TAKING_MAGAO",
  READY_HENGAO: "READY_HENGAO",
  DETECTING_HENGAO: "DETECTING_HENGAO",
  SUCCESS_HENGAO: "SUCCESS_HENGAO",
  FAIL_HENGAO: "FAIL_HENGAO",
} as const;

export type APP_STATE_TYPE = keyof typeof appState;

const actionCreator = actionCreatorFactory();

export const setAppState = actionCreator<APP_STATE_TYPE>("SET_APP_STATUS");

export const thunkInitApp = (video: HTMLVideoElement): AppThunk => async (
  dispatch
) => {
  dispatch(setAppState(appState.INITIALIZING_APP));
  await Promise.all([
    dispatch(thunkPrepareFaceApi()),
    dispatch(thunkPrepareVideo(video)),
  ]);
  dispatch(setAppState(appState.WAIT_MAGAO));
};
