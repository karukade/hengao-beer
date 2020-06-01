import { reducerWithInitialState } from "typescript-fsa-reducers";
import { prepareFaceApi } from "../actions/face-api";

export type FaceApiStateType = {
  preparing: boolean;
  error: boolean;
};

const initialState: FaceApiStateType = {
  preparing: false,
  error: false,
};

export const faceApiReducer = reducerWithInitialState(initialState)
  .case(prepareFaceApi.started, (state, preparing) => ({
    ...state,
    preparing,
  }))
  .case(prepareFaceApi.done, (state, { result }) => ({
    ...state,
    preparing: result,
  }))
  .case(prepareFaceApi.failed, (state, { error }) => ({
    ...state,
    error,
  }));
