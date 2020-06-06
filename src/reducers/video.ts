import { reducerWithInitialState } from "typescript-fsa-reducers";
import { setVideo, prepareVideo } from "../actions/video";

export type VideoStateType = {
  video: HTMLVideoElement | null;
  preparing: boolean;
};

const initialState: VideoStateType = {
  video: null,
  preparing: false,
};

export const videoReducer = reducerWithInitialState(initialState)
  .case(setVideo, (state, video) => ({ ...state, video }))
  .case(prepareVideo.started, (state) => ({ ...state, preparing: true }))
  .case(prepareVideo.done, (state) => ({
    ...state,
    preparing: false,
  }));
