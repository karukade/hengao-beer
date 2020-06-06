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

export const getMatcher = async (video: HTMLVideoElement) => {
  const descriptors = [];
  for (let i = 0; i < 4; i++) {
    const detection = await faceApi
      .detectSingleFace(video, new faceApi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();
    if (!detection) continue;
    descriptors.push(detection.descriptor);
    console.log(detection.descriptor);
  }
  return new faceApi.LabeledFaceDescriptors("default", descriptors);
};
