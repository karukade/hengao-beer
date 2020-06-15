import { reducerWithInitialState } from "typescript-fsa-reducers";
import { setVideo } from "../actions/video";

export type VideoStateType = {
  element: HTMLVideoElement | null;
};

const initialState: VideoStateType = {
  element: null,
};

export const videoReducer = reducerWithInitialState(initialState).case(
  setVideo,
  (state, element) => ({ ...state, element })
);
