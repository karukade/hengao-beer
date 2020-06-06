import actionCreatorFactory from "typescript-fsa";
import { thunkPrepareFaceApi } from "./faceApi";
import { thunkPrepareVideo } from "./video";

import { AppThunk } from "../reducers";

const actionCreator = actionCreatorFactory();

export const initApp = actionCreator.async<void, void, void>("INIT_APP");

export const thunkInitApp = (video: HTMLVideoElement): AppThunk => async (
  dispatch
) => {
  dispatch(initApp.started());
  await Promise.all([
    dispatch(thunkPrepareFaceApi()),
    dispatch(thunkPrepareVideo(video)),
  ]);
  dispatch(initApp.done({}));
};
