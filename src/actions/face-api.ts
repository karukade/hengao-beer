import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const prepareFaceApi = actionCreator.async<boolean, boolean, boolean>(
  "PREPARE_FACEAPI"
);

// export const updateVideoReady = actionCreator<boolean>("UPDATE_VIDEO_READY");
