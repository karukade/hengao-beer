import actionCreatorFactory from "typescript-fsa";
import { AppThunk } from "../reducers";

const actionCreator = actionCreatorFactory();

export const setVideo = actionCreator<HTMLVideoElement>("SET_VIDEO_DOM");
export const prepareVideo = actionCreator.async<void, void, void>(
  "PREPARE_VIDEO"
);

export const thunkPrepareVideo = (
  videoElm: HTMLVideoElement
): AppThunk => async (dispatch) => {
  dispatch(prepareVideo.started());
  dispatch(setVideo(videoElm));
  const srcObj = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  videoElm.srcObject = srcObj;
  videoElm.playsInline = true;
  videoElm.muted = true;
  await videoElm.play().then(() => {
    dispatch(prepareVideo.done({}));
  });
};
