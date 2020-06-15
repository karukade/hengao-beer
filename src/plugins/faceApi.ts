import * as faceApi from "face-api.js";

const widgetsDir = `${process.env.PUBLIC_URL}/widgets`;
const hengaoThreshold = 45;
const magaoTimeOut = 10000;

export const loadWidgets = () => {
  return Promise.all([
    faceApi.nets.tinyFaceDetector.loadFromUri(widgetsDir),
    faceApi.nets.faceLandmark68TinyNet.loadFromUri(widgetsDir),
    faceApi.nets.faceRecognitionNet.loadFromUri(widgetsDir),
    // faceApi.nets.ssdMobilenetv1.loadFromUri(widgetsDir),
  ]);
};

const getDespriptorsArray = async (video: HTMLVideoElement) => {
  const descriptors = [];
  let count = 4;
  while (count > 0) {
    const descriptor = await getFaceDescriptor(video);
    if (!descriptor) continue;
    descriptors.push(descriptor);
    --count;
  }
  return descriptors;
};

const timeOut = (ms: number) =>
  new Promise<null>((resolve) => {
    setTimeout(resolve, ms, null);
  });

export const getMatcher = async (video: HTMLVideoElement) => {
  const descriptors = await Promise.race<Float32Array[] | null>([
    getDespriptorsArray(video),
    timeOut(magaoTimeOut),
  ]);
  if (!descriptors) return null;
  const labeledDescriptors = new faceApi.LabeledFaceDescriptors(
    "default",
    descriptors
  );
  return new faceApi.FaceMatcher(labeledDescriptors, 0.6);
};

export const getFaceDescriptor = async (video: HTMLVideoElement) => {
  const detection = await faceApi
    .detectSingleFace(video, new faceApi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();
  return detection?.descriptor;
};

export const detectHengao = async (
  video: HTMLVideoElement | null,
  matcher: faceApi.FaceMatcher | null
) => {
  if (!video || !matcher) return null;
  const descriptor = await getFaceDescriptor(video);
  if (!descriptor) return null;
  const { distance } = matcher.findBestMatch(descriptor);
  const percent = distance * 100;
  const isHengao = percent > hengaoThreshold;
  return { distance: percent, isHengao, hengaoThreshold };
};
