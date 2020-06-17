import { combineReducers } from "redux";

import { faceApiReducer, FaceApiStateType } from "../reducers/faceApi";
import { videoReducer, VideoStateType } from "../reducers/video";
import { appReducer, AppStateType } from "../reducers/app";

import { ThunkAction } from "redux-thunk";
import { Action } from "typescript-fsa";

export type StateType = {
  faceApi: FaceApiStateType;
  video: VideoStateType;
  app: AppStateType;
};

export type AppThunk<T = void> = ThunkAction<
  T, // return
  StateType, // rootState
  unknown, // extraArgument
  Action<any> // action
>;

export const rootReducer = combineReducers<StateType>({
  faceApi: faceApiReducer,
  video: videoReducer,
  app: appReducer,
});
