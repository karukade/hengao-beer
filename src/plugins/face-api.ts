import * as faceApi from "face-api.js";

const widgetsDir = `${process.env.PUBLIC_URL}/widgets`;

export const loadWidgets = () => {
  return Promise.all([
    faceApi.nets.tinyFaceDetector.loadFromUri(widgetsDir),
    faceApi.nets.faceLandmark68Net.loadFromUri(widgetsDir),
    faceApi.nets.faceRecognitionNet.loadFromUri(widgetsDir),
    faceApi.nets.ssdMobilenetv1.loadFromUri(widgetsDir),
  ]);
};
