import { reducerWithInitialState } from "typescript-fsa-reducers";
import { prepareFaceApi, setMatcher } from "../actions/faceApi";
import { FaceMatcher } from "face-api.js";

export type FaceApiStateType = {
  preparing: boolean;
  error: boolean;
  matcher: FaceMatcher | null;
};

const initialState: FaceApiStateType = {
  preparing: false,
  error: false,
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
  .case(setMatcher, (state, matcher) => ({
    ...state,
    matcher,
  }));
