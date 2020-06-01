import { combineReducers, createStore } from "redux";
import { faceApiReducer, FaceApiStateType } from "../reducers/face-api";
import { hogeReducer, HogeStateType } from "../reducers/hoge";

export type StateType = {
  hoge: HogeStateType;
  faceApi: FaceApiStateType;
};

const reducers = combineReducers<StateType>({
  hoge: hogeReducer,
  faceApi: faceApiReducer,
});

export const Store = createStore(reducers);

/*
const redicers = (state, action) => ({
  hoge: hogeReducer(state.hoge, action)
})
*/
