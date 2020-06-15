import actionCreatorFactory from "typescript-fsa";
import { AppThunk } from "../reducers";

const actionCreator = actionCreatorFactory();

export const setVideo = actionCreator<HTMLVideoElement>("SET_VIDEO_DOM");

export const thunkPrepareVideo = (
  videoElm: HTMLVideoElement
): AppThunk => async (dispatch) => {
  if (navigator.mediaDevices === undefined) {
    const err = new Error("");
    err.name = "MediaDeviceNotSupport";
    throw err;
  }
  dispatch(setVideo(videoElm));
  const srcObj = await navigator.mediaDevices.getUserMedia({
    video: {
      width: 720,
      height: 720,
    },
  });
  videoElm.srcObject = srcObj;
  videoElm.playsInline = true;
  videoElm.muted = true;
  return videoElm.play();
};
