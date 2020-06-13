import actionCreatorFactory from "typescript-fsa";
import { thunkPrepareFaceApi, setMatcher } from "./faceApi";
import { thunkPrepareVideo } from "./video";

import { getMatcher } from "../plugins/faceApi";
import { AppThunk } from "../reducers";

export const appState = {
  WAIT_START: "WAIT_START",
  START_APP: "START_APP",
  INITIALIZING_APP: "INITIALIZING_APP",
  WAIT_MAGAO: "WAIT_MAGAO",
  TAKING_MAGAO: "TAKING_MAGAO",
  FAIL_MAGAO_TAKE: "FAIL_MAGAO_TAKE",
  WAIT_HENGAO: "WAIT_HENGAO",
  READY_HENGAO: "READY_HENGAO",
  DETECTING_HENGAO: "DETECTING_HENGAO",
  DETECTING_HENGAO_FILL: "DETECTING_HENGAO_FILL",
  SUCCESS_HENGAO: "SUCCESS_HENGAO",
  FAIL_HENGAO: "FAIL_HENGAO",
} as const;
export type APP_STATE_TYPE = keyof typeof appState;
const actionCreator = actionCreatorFactory();

export const setAppState = actionCreator<APP_STATE_TYPE>("SET_APP_STATUS");
export const setHengao = actionCreator<string>("SET_HENGAO");
export const setCanvas = actionCreator<HTMLCanvasElement>("SET_CANVAS");

export const thunkInitApp = ({
  video,
  canvas,
}: {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
}): AppThunk => async (dispatch) => {
  dispatch(setAppState(appState.INITIALIZING_APP));
  dispatch(setCanvas(canvas));
  await Promise.all([
    dispatch(thunkPrepareFaceApi()),
    dispatch(thunkPrepareVideo(video)),
  ]);
  dispatch(setAppState(appState.WAIT_MAGAO));
};

export const thunkGetMatcher = (): AppThunk => async (dispatch, getState) => {
  const video = getState().video.element;
  if (!video) return;
  dispatch(setAppState(appState.TAKING_MAGAO));
  const matcher = await getMatcher(video);
  if (!matcher) {
    dispatch(setAppState(appState.FAIL_MAGAO_TAKE));
    return;
  }
  dispatch(setMatcher(matcher));
  dispatch(setAppState(appState.WAIT_HENGAO));
};

export const thunkSuccessHengao = (): AppThunk => (dispatch, getState) => {
  const {
    app: { canvas },
    video: { element: video },
  } = getState();

  if (!canvas || !video) return;

  const ctx = canvas.getContext("2d");
  ctx?.drawImage(video, 0, 0, 300, 300);
  const src = canvas.toDataURL();

  dispatch(setHengao(src));
  dispatch(setAppState(appState.SUCCESS_HENGAO));
};
