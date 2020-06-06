import { reducerWithInitialState } from "typescript-fsa-reducers";
import { prepareFaceApi, prepareMatcher } from "../actions/faceApi";
import { LabeledFaceDescriptors } from "face-api.js";

export type FaceApiStateType = {
  preparing: boolean;
  error: boolean;
  matcherPreparing: boolean;
  matcher: LabeledFaceDescriptors | null;
};

const initialState: FaceApiStateType = {
  preparing: false,
  error: false,
  matcherPreparing: false,
  matcher: null,
};

export const faceApiReducer = reducerWithInitialState(initialState)
  .case(prepareFaceApi.started, (state) => ({
    ...state,
    preparing: true,
  }))
  .case(prepareFaceApi.done, (state) => ({
    ...state,
    preparing: false,
  }))
  .case(prepareFaceApi.failed, (state) => ({
    ...state,
    error: true,
    preparing: false,
  }))
  .case(prepareMatcher.started, (state) => ({
    ...state,
    matcherPreparing: true,
  }))
  .case(prepareMatcher.done, (state, { result }) => ({
    ...state,
    matcher: result,
  }));
