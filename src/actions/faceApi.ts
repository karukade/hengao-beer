import actionCreatorFactory from "typescript-fsa";
import { loadWidgets, getMatcher } from "../plugins/faceApi";
import { LabeledFaceDescriptors } from "face-api.js";

import { AppThunk } from "../reducers";

const actionCreator = actionCreatorFactory();

export const prepareFaceApi = actionCreator.async<void, void, void>(
  "PREPARE_FACEAPI"
);

export const prepareMatcher = actionCreator.async<
  void,
  LabeledFaceDescriptors,
  void
>("PREPARE_MATCHER");

export const thunkPrepareFaceApi = (): AppThunk => async (dispatch) => {
  dispatch(prepareFaceApi.started());
  return loadWidgets().then(() => dispatch(prepareFaceApi.done({})));
};

export const thunkPrepareMatcher = (
  video: HTMLVideoElement
): AppThunk => async (dispatch) => {
  dispatch(prepareMatcher.started());
  const matcher = await getMatcher(video);
  dispatch(prepareMatcher.done({ result: matcher }));
};
