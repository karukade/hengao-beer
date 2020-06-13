import actionCreatorFactory from "typescript-fsa";
import { loadWidgets } from "../plugins/faceApi";
import { FaceMatcher } from "face-api.js";

import { AppThunk } from "../reducers";

const actionCreator = actionCreatorFactory();

export const prepareFaceApi = actionCreator.async<void, void, void>(
  "PREPARE_FACEAPI"
);

export const setMatcher = actionCreator<FaceMatcher>("SET_MATCHER");

export const thunkPrepareFaceApi = (): AppThunk => async (dispatch) => {
  dispatch(prepareFaceApi.started());
  return loadWidgets().then(() => dispatch(prepareFaceApi.done({})));
};
