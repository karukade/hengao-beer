import { reducerWithInitialState } from "typescript-fsa-reducers";
import { setVideo, prepareVideo } from "../actions/video";

export type VideoStateType = {
  element: HTMLVideoElement | null;
  preparing: boolean;
};

const initialState: VideoStateType = {
  element: null,
  preparing: false,
};

export const videoReducer = reducerWithInitialState(initialState)
  .case(setVideo, (state, element) => ({ ...state, element }))
  .case(prepareVideo.started, (state) => ({ ...state, preparing: true }))
  .case(prepareVideo.done, (state) => ({
    ...state,
    preparing: false,
  }));
