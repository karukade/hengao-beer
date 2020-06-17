import actionCreatorFactory from "typescript-fsa";

import { AppThunk } from "../reducers";
import { FaceMatcher } from "face-api.js";

type GetMatcherReturnType = Promise<FaceMatcher | null>;

const actionCreator = actionCreatorFactory();
let faceApiMethods!: {
  loadWidgets: () => Promise<[void, void, void]>;
  getMatcher: (video: HTMLVideoElement) => GetMatcherReturnType;
};

const importFaceApiMethods = async (): Promise<typeof faceApiMethods> => {
  const { loadWidgets, getMatcher } = await import("../plugins/faceApi");
  return { loadWidgets, getMatcher };
};

export const prepareFaceApi = actionCreator.async<void, void, void>(
  "PREPARE_FACEAPI"
);
export const setMatcher = actionCreator<
  ResolvedType<() => GetMatcherReturnType>
>("SET_MATCHER");

export const thunkPrepareFaceApi = (): AppThunk => async (dispatch) => {
  dispatch(prepareFaceApi.started());
  faceApiMethods = await importFaceApiMethods();
  return faceApiMethods
    .loadWidgets()
    .then(() => dispatch(prepareFaceApi.done({})));
};
export const thunkSetMatcher = (
  video: HTMLVideoElement
): AppThunk<GetMatcherReturnType> => async (dispatch) => {
  return faceApiMethods.getMatcher(video).then((matcher) => {
    dispatch(setMatcher(matcher));
    return matcher;
  });
};
